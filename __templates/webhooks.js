/**
 * Use this as a template for creating new webhooks
 *
 * Webhooks go in webhooks/
 * Add the webhook to webhooks/_webhooksRegistrar.js
 * Add router to webhooks/_webhooksRouteRegistrar.js
 *
 *
 *
 * Update the following:
 *
 * webhookNameRoute
 * webhookNameWebhook
 * WEBHOOK_TOPIC
 */
const {
  receiveWebhook,
  registerWebhook,
} = require("@shopify/koa-shopify-webhooks");
const webhook = receiveWebhook({ secret: process.env.SHOPIFY_API_SECRET });
const Router = require("koa-router");
const webhookNameRoute = new Router();
const { ApiVersion } = require("@shopify/shopify-api");

const webhookUrl = "/webhooks/app/your-webhook-url";

//
//MARK:- Webhook
//

const webhookNameWebhook = async (shop, accessToken) => {
  const webhookStatus = await registerWebhook({
    address: `${process.env.SHOPIFY_APP_URL}${webhookUrl}`,
    topic: "WEBHOOK_TOPIC", //Get the list of webhook topics from https://shopify.dev/docs/admin-api/graphql/reference/events/webhooksubscriptiontopic
    accessToken,
    shop,
    apiVersion: process.env.SHOPIFY_API_VERSION,
  });

  webhookStatus.success
    ? console.log(`--> Successfully registered uninstall webhook! for ${shop}`)
    : console.log(
        "--> Failed to register uninstall webhook",
        webhookStatus.result.data.webhookSubscriptionCreate.userErrors
      );
};

//
//MARK:- Route
//

webhookNameRoute.post(`${webhookUrl}`, webhook, async (ctx) => {
  const shop = ctx.state.webhook.payload.domain;

  //Process here
});

module.exports = { webhookNameWebhook, webhookNameRoute };
