import React from "react";
const store = require("store");

const UtilityComponent = (shop) => {
  store.set("shopUrl", shop.shop);
  return <div />;
};

export default UtilityComponent;
