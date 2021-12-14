require("dotenv").config();
const Koa = require("koa");
const {
  default: createShopifyAuth,
  verifyRequest,
} = require("@shopify/koa-shopify-auth");
const { default: Shopify } = require("@shopify/shopify-api");
const next = require("next");
const Router = require("koa-router");

const mongoose = require("mongoose");
const sessionStorage = require("./utils/sessionStorage.js");
const SessionModel = require("./models/SessionModel.js");

const webhooksRegistrar = require("./webhooks/_webhooksRegistrar.js");
const webhookRouters = require("./webhooks/_webhookRouters.js");
const userRoutes = require("./routes/index.js");

const port = parseInt(process.env.PORT, 10) || 8081;
const dev = process.env.NODE_ENV !== "production";
const app = next({
  dev,
});
const handle = app.getRequestHandler();

//MARK:- MongoDB Connection
const mongoUrl =
  process.env.MONGO_URL || "mongodb://127.0.0.1:27017/shopify-app";

mongoose.connect(
  mongoUrl,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) {
      console.log("--> There was an error connecting to MongoDB:", err.message);
    } else {
      console.log("--> Connected to MongoDB");
    }
  }
);

//MARK:- Shopify Init
Shopify.Context.initialize({
  API_KEY: process.env.SHOPIFY_API_KEY,
  API_SECRET_KEY: process.env.SHOPIFY_API_SECRET,
  SCOPES: process.env.SHOPIFY_API_SCOPES.split(","),
  HOST_NAME: process.env.SHOPIFY_APP_URL.replace(/https:\/\//, ""),
  API_VERSION: process.env.SHOPIFY_API_VERSION,
  IS_EMBEDDED_APP: true,
  SESSION_STORAGE: sessionStorage,
});

app.prepare().then(async () => {
  const server = new Koa();
  const router = new Router();
  server.keys = [Shopify.Context.API_SECRET_KEY];

  server.use(
    createShopifyAuth({
      async afterAuth(ctx) {
        const { shop, accessToken, scope } = ctx.state.shopify;
        const host = ctx.query.host;

        webhooksRegistrar(shop, accessToken); //MARK:- TODO | Check to see if the store already has webhooks setup to avoid the failing re-registration of webhooks 

        ctx.redirect(`/?shop=${shop}&host=${host}`);
      },
    })
  );

  const handleRequest = async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
    ctx.res.statusCode = 200;
  };

  router.post(
    "/graphql",
    verifyRequest({ returnHeader: true }),
    async (ctx, next) => {
      await Shopify.Utils.graphqlProxy(ctx.req, ctx.res);
    }
  );

  router.get("(/_next/static/.*)", handleRequest); // Static content is clear
  router.get("/_next/webpack-hmr", handleRequest); // Webpack content is clear
  router.get("(.*)", async (ctx) => {
    const shop = ctx.query.shop;
    const findShopCount = await SessionModel.countDocuments({ shop });

    if (findShopCount < 2) {
      await SessionModel.deleteMany({ shop });
      ctx.redirect(`/auth?shop=${shop}`);
    } else {
      await handleRequest(ctx);
    }
  });

  //MARK:- Routes and routers
  server.use(webhookRouters());
  server.use(userRoutes());

  server.use(router.allowedMethods());
  server.use(router.routes());
  server.listen(port, () => {
    console.log(`--> Ready on http://localhost:${port}`);
  });
});
