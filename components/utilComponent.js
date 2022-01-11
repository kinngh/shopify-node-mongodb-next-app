/*
    This is an empty component to get current shop url and name. You can call the component when you need it, like recurring subscriptions, and before you show the button, run the query and wait for localstorage to be populated.

    Please delete any unnecessary console logs and use a proper logging library instead.
*/
import { useQuery, gql } from "@apollo/client";
const store = require("store");

const getShopQuery = gql`
  {
    shop {
      name
      url
    }
  }
`;

const UtilityComponent = () => {
  const { data, loading, error } = useQuery(getShopQuery);

  if (loading) {
    console.log("--> Running util component queries");
  }

  if (error) {
    console.log(`--> Error in util component queries: ${error.message}`);
  }

  if (data) {
    store.set("shopUrl", data.shop.url);
    store.set("myshopifyUrl", data.shop.url.replace("https://", ""));
    console.log("--> Util components set successfully");
  }
  return <div />;
};

export default UtilityComponent;
