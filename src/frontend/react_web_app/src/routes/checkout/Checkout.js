import React from "react";
import { StripeProvider, Elements } from "react-stripe-elements";
import Layout from "../../layout/Layout";
import CheckoutForm from "./CheckoutForm";

export default () => {
  return (
    <Layout>
      <StripeProvider apiKey="pk_test_Jk5tUWmPGGO41NMhr5T2cgcJ00VtcrxExE">
        <Elements>
          <CheckoutForm />
        </Elements>
      </StripeProvider>
    </Layout>
  );
};
