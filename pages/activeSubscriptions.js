import React from "react";
import { Page, Card, Layout, Button } from "@shopify/polaris";
import { useRouter } from "next/router";
import { useQuery, gql } from "@apollo/client";
import SubscriptionData from "../components/SubscriptionData.js";

const ActiveSubscriptions = () => {
  const router = useRouter();
  const getActiveSubscriptions = gql`
    {
      appInstallation {
        activeSubscriptions {
          name
          status
          lineItems {
            id
          }
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(getActiveSubscriptions);

  return (
    <React.Fragment>
      <Page>
        <Layout>
          <Layout.Section>
            <Card title="Getting current subscriptions" sectioned>
              <SubscriptionData loading={loading} error={error} data={data} />
              <br />
              <Button
                size="large"
                onClick={() => {
                  router.push("/");
                }}
              >
                Home
              </Button>
            </Card>
          </Layout.Section>
        </Layout>
      </Page>
    </React.Fragment>
  );
};

export default ActiveSubscriptions;
