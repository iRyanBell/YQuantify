import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";

export default ({ onDialogShow }) => {
  return (
    <Layout>
      <NavBar onDialogShow={onDialogShow} />
    </Layout>
  );
};