# Shopify Node.js x Next.js x MongoDB Boilerplate

# Update

# [Express x React x Vite x MongoDB repo](https://github.com/kinngh/shopify-node-express-mongodb-app)

**Q: Why archive the repo?**

- The [Express x React x Vite x MongoDB repo](https://github.com/kinngh/shopify-node-express-mongodb-app) gives more control on the server, is beginner friendly and in my experience, `~10x` faster on dev and `~3x - 7x` faster on production, better build times and lower latency. Running into problems in Koa always meant using more packages and with the lack of control over how the internal redirections work among other issues, I decided to move on and focus on one repo instead.

**Q: How do I migrate?**

- `useRouter` is replaced with `navigate`
- `pages` and `components` remain almost the same, except for routing and any Next.js libraries.
- `server.js` is now a separate folder with middlewares separated out. You can directly build on it.
- Webhooks is now a three step process. Check [`__templates/webhooks.js`](https://github.com/kinngh/shopify-node-express-mongodb-app/blob/main/__templates/webhooks.js) to understand how webhook registration works.
- Mongo Models can be directly brought over.

If I missed anything, I'm sure the new repo is clear enough to answer any and all questions that may arise. If not, please head over to [discussions](https://github.com/kinngh/shopify-node-express-mongodb-app/discussions) and contributors may come to rescue, if not, there's always Stack Overflow.

**Q: I wanted a Next.js repo to deploy on Vercel/Netlify**

- This repo used a custom Next.js server that is not supported on either platforms and you'd have to deploy on AWS/NorthFlank/Heroku anyways.

# [Express x React x Vite x MongoDB repo](https://github.com/kinngh/shopify-node-express-mongodb-app)
