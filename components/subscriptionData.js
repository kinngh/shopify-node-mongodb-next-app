import React from "react";

const SubscriptionData = ({ error, loading, data }) => {
  if (error) return <p>{error.message}</p>;
  if (loading) return <p>Loading</p>;

  if (data) {
    const { name, status } = data.appInstallation.activeSubscriptions[0];
    const { id } = data.appInstallation.activeSubscriptions[0].lineItems[0];
    return (
      <React.Fragment>
        <p>
          <strong>Id:</strong> {id}
        </p>
        <p>
          <strong>Name:</strong> {name}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>No recurring subscription data found.</p>
      </React.Fragment>
    );
  }
};

export default SubscriptionData;
