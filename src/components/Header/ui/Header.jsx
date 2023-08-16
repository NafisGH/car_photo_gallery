import { NavBar } from "../NavBar";
import { Avatar, Box, Divider, Text, Button } from "@chakra-ui/react";
import Modals from "pages/Modals/ui/Modals";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <Box>
      <Box
        w="100%"
        bg="rgb(40, 40, 40)"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text ml="10px" color="white" fontSize="30px">
          Project App
        </Text>

        <Modals />

        <NavBar />

        <Box>
          <Button colorScheme="blue">
            <NavLink to="/sign-in">Sign In</NavLink>
          </Button>
          <Button
            colorScheme="teal"
            variant="outline"
            ml="10px"
            color="white"
            _hover={{ color: "blue" }}
          >
            <NavLink to="/sign-up">Sign Up</NavLink>
          </Button>
        </Box>

        <Avatar
          src="https://bit.ly/broken-link"
          m={3}
          _hover={{ cursor: "pointer" }}
        />
      </Box>
      <Divider />
    </Box>
  );
};

export default Header;
