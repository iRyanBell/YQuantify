import React from "react";
import Layout from "../../layout/Layout";
import NavBar from "../../components/NavBar/NavBar";

export default ({ onDialog }) => {
  return (
    <Layout>
      <NavBar onDialog={onDialog} />
    </Layout>
  );
};
