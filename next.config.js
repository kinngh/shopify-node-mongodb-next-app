/*
  Security note: Don't expose any secret env values here.
*/

const webpack = require("webpack");
const apiKey = JSON.stringify(process.env.SHOPIFY_API_KEY);
const appUrl = JSON.stringify(process.env.SHOPIFY_APP_URL);

module.exports = {
  swcMinify: true, //Use Rust compiler (beta)
  webpack: (config) => {
    const env = { API_KEY: apiKey, appOrigin: appUrl };
    config.plugins.push(new webpack.DefinePlugin(env));

    //MARK:- ESM support for .mjs
    // config.module.rules.push({
    //   test: /\.mjs$/,
    //   include: /node_modules/,
    //   type: "javascript/auto",
    // });

    return config;
  },
  /*
    experimental: {
      concurrentFeatures: true, //server side streaming
      serverComponents: true, //React server side components
      urlImports: ["https://cdn.whitelisted-url.com/"] //Use URL imports. Domain must be whitelisted first.
    },
  */
};
