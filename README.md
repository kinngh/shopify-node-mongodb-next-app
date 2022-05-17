# Shopify Node.js x Next.js x MongoDB Boilerplate

An embedded app starter template to get up and ready with Shopify app development with JavaScript.

## Update
- [Express x React x Vite x MongoDB repo](https://github.com/kinngh/shopify-node-express-mongodb-app) is now live
- This repo will still be updated for as long as I can maintain it, since I have production apps running on this boilerplate.

## Why I made this

The Shopify CLI generates an amazing starter app, but I wanted a quick-start app that had:

- MongoDB based sessions/persistence.
- Recurring Subscriptions setup and ready to go.
- Local Tunnel instead of Ngrok to avoid use of commercial software.
- Misc boilerplate code and templates to quickly setup inApp subscriptions, routes, webhooks and more.

## Notes

### Setup

- If you're new to Shopify app dev or need an in-depth guide, refer [SETUP.md](/SETUP.md) instead.

- Run `npm i --force` to install all dependencies.
- Create `.env` file based on `.env.example`.
- Run `npm run tunnel` and add the URL at `SHOPIFY_APP_URL` in `.env` and your app settings in your Partner Dashboard.
  - If you don't update the URL in `.env` and app settings, you're going to run into "URI Not Whitelisted" error.

---

- The GDPR endpoints are available in `routes/gdpr/` folder. Add the following URLs in the GDPR section of your App Setup
  - Data Request Endpoint: `/app/gdpr/customers_data_request`
  - Data Erase Endpoint: `/app/gdpr/customers_redact`
  - Shop Data Erase Endpoint: `/app/gdpr/shop_redact`

### Run

- Open two terminal windows with `npm run tunnel` and `npm run dev`, this way you have one session running the `localtunnel` at all times.
- If you're using a locally hosted version of MongoDB, ensure `mongod` server is running.
  - To specify a directory for your MongoDB database, run `mongod --dbpath /path/to/directory`

### Misc notes

- Most scripts in `package.json` contain `rm -rf .next` to remove the generated `.next` folder to reduce caching errors. If you're on Windows, please switch them out to `rmdir .next`
- MongoDB collections are kept separate to allow for flexibility while building applications. Feel free to rewrite them.
- When pushing to production, add `__templates` to `.gitignore`.
