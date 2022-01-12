import React from "react";
import { useRouter } from "next/router";
import { Page, Card } from "@shopify/polaris";
import UtilityComponent from "../components/utilComponent";

const Index = (...props) => {
  const router = useRouter();
  const { shop } = props[0];
  return (
    <Page>
      {shop && <UtilityComponent shop={shop} />}
      <Card title="DEBUG" sectioned>
        <p>
          These are temporary placeholders to debug content. Once you're in the
          page, please check the console for more information.
        </p>
      </Card>
      <Card
        title="Subscriptions"
        sectioned
        primaryFooterAction={{
          content: "Subscriptions",
          onAction: () => {
            router.push("/activeSubscriptions");
          },
        }}
      >
        <p>Check for active/cancelled/expired subscriptions for your app.</p>
      </Card>

      <Card
        title="Create Subscriptions"
        sectioned
        primaryFooterAction={{
          content: "Recurring",
          onAction: () => {
            router.push("/recurringSubscription");
          },
        }}
      >
        <p>Create recurring susbcriptions for your merchants.</p>
      </Card>
    </Page>
  );
};

export default Index;
