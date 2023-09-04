import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) return <Navigate replace to="/sign-in" />;

  return user.token ? <Outlet /> : <Navigate replace to="/sign-in" />;
};

export default ProtectedRoute;
