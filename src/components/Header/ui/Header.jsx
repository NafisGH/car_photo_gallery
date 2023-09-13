import { selectDataUser } from "app/redux/slices/userReducer";
import { Avatar, Box, Button, Text } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Modals from "pages/Modals/ui/Modals";

const Header = () => {
  const { email } = useSelector(selectDataUser);
  const navigate = useNavigate();

  const handleLogOut = () => {
    navigate("/sign-in");
    localStorage.removeItem("token");
  };

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
        Project car photo gallery
      </Text>

      <Box display={"flex"} alignItems={"center"}>
        <Modals />
        <Box color={"white"}>{email}</Box>
        <Avatar
          src="https://bit.ly/broken-link"
          m={3}
          _hover={{ cursor: "pointer" }}
        />
        <Button onClick={handleLogOut}>Exit</Button>
      </Box>
    </Box>
  );
};

export default Header;
