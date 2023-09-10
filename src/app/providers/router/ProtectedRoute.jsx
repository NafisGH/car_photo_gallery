import { Center, Spinner } from "@chakra-ui/react";
import { useAuth } from "hooks/useAutn";
import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isValid, isLoading } = useAuth();

  if (isLoading)
    return (
      <Center minHeight={"100vh"} bgColor="silver">
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt="15%"
        />
      </Center>
    );

  return isValid ? <Outlet /> : <Navigate replace to="/sign-in" />;
};

export default ProtectedRoute;
