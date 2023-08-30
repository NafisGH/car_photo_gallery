import { selectDataUser } from "app/redux/slices/userReducer";
import { NavBar } from "../NavBar";
import { Avatar, Box, Text } from "@chakra-ui/react";
import Modals from "pages/Modals/ui/Modals";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Header = () => {
  const { email } = useSelector(selectDataUser);
  return (
    <Box
      w="100%"
      bg="rgb(40, 40, 40)"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      pl={"30px"}
      pr={"30px"}
      position={"fixed"}
      zIndex={"10"}
    >
      <Text ml="10px" color="white" fontSize="30px">
        Project App
      </Text>

      <Modals />

      <NavBar />

      <Box 
        display={"flex"}
        alignItems={"center"}
      >
        <Box color={"white"}>{email}</Box>
        <Avatar
          src="https://bit.ly/broken-link"
          m={3}
          _hover={{ cursor: "pointer" }}
        />
      </Box>
    </Box>
  );
};

export default Header;
