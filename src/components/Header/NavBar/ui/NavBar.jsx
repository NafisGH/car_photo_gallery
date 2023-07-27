import React from "react";
import { NavLink } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";

const NavBar = () => {
  return (
    <Box
      fontSize="30px"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Button color="white" _hover={{ color: "blue" }} variant="outline">
        <NavLink to="/">Home</NavLink>
      </Button>

      <Button
        color="white"
        _hover={{ color: "blue" }}
        variant="outline"
        ml="20px"
      >
        <NavLink to="/user">User</NavLink>
      </Button>
    </Box>
  );
};

export default NavBar;
