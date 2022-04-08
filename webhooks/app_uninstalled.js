const {
  receiveWebhook,
  registerWebhook,
} = require("@shopify/koa-shopify-webhooks");
const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });
const Router = require("koa-router");
const appUninstallRoute = new Router();
const SessionModel = require("../models/SessionModel.js");

const webhookUrl = "/webhooks/app/uninstall";

//
//MARK:- Webhook
//

const appUninstallWebhook = async (shop, accessToken) => {
  const webhookStatus = await registerWebhook({
    address: `${process.env.SHOPIFY_APP_URL}${webhookUrl}`,
    topic: "APP_UNINSTALLED",
    accessToken,
    shop,
    apiVersion: process.env.SHOPIFY_API_VERSION,
  });

  webhookStatus.success
    ? console.log(`--> Successfully registered uninstall webhook for ${shop}`)
    : console.log(
        "--> Failed to register uninstall webhook",
        webhookStatus.result.data.webhookSubscriptionCreate.userErrors
      );
};

//
//MARK:- Route
//

appUninstallRoute.post(`${webhookUrl}`, webhook, async (ctx) => {
  const shop = ctx.state.webhook.payload.domain;
  var regexp = new RegExp("^" + shop);
  await SessionModel.deleteMany({ shop: regexp });
  console.log(`--> Deleted records for ${shop}`);
});

module.exports = { appUninstallWebhook, appUninstallRoute };
