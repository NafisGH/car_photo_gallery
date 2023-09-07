import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "components/Header/ui";

const MainLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export default MainLayout;
