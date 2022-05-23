# Setup

This is a more in-depth guide on setting up the repo, if you're new to Shopify app dev using unofficial templates / troubleshooting. The repo currently doesn't work with the official CLI so values need to be manually updated.

- [ ] Run `npm i --force` to install dependencies.

  - There are substantial efforts in not using depreciated packages like `apollo-boost` and older versions of React and Next, which are required dependencies for packages like `@shopify/polaris`. Disabling saftey checks while installing packages hasn't affected any functionality. Yet.

- [ ] Create a new app (Public or Custom) from your [Shopify Partner Dashboard](https://partners.shopify.com).

  - The App URL will be generated later in the setup. Add `https://127.0.0.1` for the moment.

- [ ] Build your `.env` file based on `.env.example`

  - `SHOPIFY_API_KEY`: App API key.
  - `SHOPIFY_API_SECRET`: App secret.
  - `SHOPIFY_API_SCOPES`: Scopes required by your Shopify app. A list of access scopes can be found [here](https://shopify.dev/api/usage/access-scopes)
  - `SHOPIFY_APP_URL`: URL generated from Localtunnel (If you haven't used localtunnel, we'll be generating this in a moment).
  - `SHOPIFY_API_VERSION`: Pre-filled; Swap out if you're using a different API version.
  - `MONGO_URL`: Mongo connection URL. If you're using a locally hosted version, you can leave it blank or use `mongodb://127.0.0.1:27017/app-name-here`
  - `ENCRYPTION_STRING`: String to use for Cryption for encrypting sessions token. Add a random salt (or a random string of letters and numbers) and save it. If you loose the string you cannot decrypt your sessions and must be kept safely.
  - `PORT`: Defaults to 8081. If you're using a different port, please update `tunnel` script in `package.json` too.

- [ ] NPM Scripts

  - `update` and `update:check`: Depends on `npm-check-updates` to force update packages to the latest available version. Can potentially break things.
  - `tunnel`: Open source alternative to Ngrok. Localtunnel is used to expose your machine to the internet. The `--port` parameter exposes a specific port (8081) over https to allow connections. Running `npm run tunnel` auto generates a URL for you. If you need a specific subdomain add `--subdomain <your-url>` to the script and generate if it's available. The URL that's generated here goes in `SHOPIFY_APP_URL` and in the URL section of your app in Partner Dashboard.

- [ ] Setup Partner Dashboard

  - Run `npm run tunnel` to generate your subdomain. Copy the `https://<your-url>.loca.lt` domain and add it in `SHOPIFY_APP_URL` in your `.env` file.
  - Open Shopify Partner Dashboard > Apps > _Your App Name_ > App Setup
  - In the URLs section
    - App URL: `https://<your-url>.local.lt`
    - Allowed Redirection URL(s): `https://<your-url>.local.lt/auth/callback`
  - A common _gotcha_ is ensuring you are using the same URL in your `.env` and App Setup sections and any discrepancy will result in "URI not whitelisted" issue.

- [ ] Running App

  - I prefer running a local `mongo` instance to save on time and ease of setup. Create a new folder in your project called `mongo` (it's added in `.gitignore` so you can git freely) and in a terminal window run `mongod --dbpath mongo/` to start a mongo instance in that folder. Ensure you're in the right folder.
  - In your second terminal window, run `npm run tunnel` to create a Local tunnel instance if you haven't already.
  - In your third terminal window (preferrably in your IDE), `npm run dev` or `npm run start` depending on how you want to test your app.

- [ ] Next.js 12
  - Next.js 12 brings in a lot of experimental features like the Rust compiler, React Server Side Rendering and more. This can be configured from `next.config.js`.
  - The experimental Rust compiler can be turned off by specifying `swcMinify: false` in `next.config.js`
