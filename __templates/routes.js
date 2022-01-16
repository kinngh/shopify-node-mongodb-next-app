/**
 * Use this as a template for creating new routes
 *
 * Routes go in routes/
 * Export and add the route to routes/index.js
 *
 *
 *
 * Update the following:
 *
 * routePath
 */

const Router = require("koa-router");
const routePath = new Router();

routePath.post("/path/to/route", async (ctx) => {
  ctx.body = "It works";
});

module.exports = routePath;
