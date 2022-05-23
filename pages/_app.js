import { AppProvider } from "@shopify/polaris";
import { Provider, useAppBridge } from "@shopify/app-bridge-react";
import { authenticatedFetch } from "@shopify/app-bridge-utils";
import translations from "@shopify/polaris/locales/en.json";
import "@shopify/polaris/build/esm/styles.css";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

function MyProvider(props) {
  const app = useAppBridge();

  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: createHttpLink({
      credentials: "include",
      headers: {
        "Content-Type": "application/graphql",
      },
      fetch: authenticatedFetch(app),
    }),
  });

  const Component = props.Component;

  return (
    <ApolloProvider client={client}>
      <Component {...props} />
    </ApolloProvider>
  );
}

const MyApp = (props) => {
  const { Component, pageProps, shop } = props;
  const providerConfig = {
    host: Buffer.from(appOrigin).toString("base64"),
    apiKey: API_KEY,
    forceRedirect: true,
  };

  return (
    <AppProvider i18n={translations}>
      <Provider config={providerConfig}>
        <MyProvider Component={Component} {...pageProps} shop={shop} />
      </Provider>
    </AppProvider>
  );
};

MyApp.getInitialProps = async ({ ctx }) => {
  return {
    shop: ctx.query.shop,
  };
};

export default MyApp;
