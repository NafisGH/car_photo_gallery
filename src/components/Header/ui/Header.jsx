import { NavBar } from "../NavBar";
import { Avatar, Box, Divider, Text, Button } from "@chakra-ui/react";
import Modals from "pages/Modals/ui/Modals";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Box
      w="100%"
      bg="rgb(40, 40, 40)"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pl={"30px"}
      pr={"30px"}
      position={"absolute"}
    >
      <Text ml="10px" color="white" fontSize="30px">
        Project App
      </Text>

      <Modals />

      <NavBar />

      <Avatar
        src="https://bit.ly/broken-link"
        m={3}
        _hover={{ cursor: "pointer" }}
      />
    </Box>
  );
};

export default Header;
