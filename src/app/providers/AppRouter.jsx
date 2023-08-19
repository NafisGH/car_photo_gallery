import PageCards from "pages/PageCards";
import React from "react";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./MainLayout";
import { PageUserProfile } from "pages/PageUserProfile";
import { PageSignIn } from "pages/PageSignIn";
import { PageSignUp } from "pages/PageSignUp";
import ProtectedRoute from "./router/ProtectedRoute";

const AppRouter = () => {
  return (
  
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<PageCards />} />
            <Route path="user" element={<PageUserProfile />} />
          </Route>
        </Route>
        <Route path="sign-in" element={<PageSignIn />} />
        <Route path="sign-up" element={<PageSignUp />} />
      </Routes>
    
  );
};

export default AppRouter;
