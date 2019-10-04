import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";

export default ({ onDialog, auth }) => {
  return (
    <Layout>
      <NavBar onDialog={onDialog} auth={auth} />
    </Layout>
  );
};
