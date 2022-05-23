/**
 *
 * Combine all webhook routers here
 *
 */

const combineRouters = require("koa-combine-routers");

const { appUninstallRoute } = require("./app_uninstalled.js");

const webhookRouters = combineRouters(appUninstallRoute); //add routers seaprated by a `,`

module.exports = webhookRouters;
