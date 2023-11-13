import { Box, Center, Text, Input, Button, FormControl } from "@chakra-ui/react";
import { signUp } from "app/redux/slices/userReducer";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";

const PageSignUp = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispach = useDispatch();
  const navigate = useNavigate();

  const handleUserName = (e) => {
    setUserName(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    dispach(signUp({ name: userName, password, email }));
    navigate("/sign-in");
  };

  const regExpEmail = /^(.+)@(.+)\.(.+)$/;
  const isEmail = regExpEmail.test(email) ? true : false;
  const isError = userName === "";

  return (
    <Center>
      <Center mt="100px" border="1px solid black" w="450px" h="500px">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text fontSize="5xl">Sign up</Text>
          <FormControl isInvalid={isError}>
            <Input
              type="text"
              w="400px"
              placeholder="Username"
              mt="20px"
              value={userName}
              onChange={handleUserName}
            />
          </FormControl>
          <FormControl isInvalid={isError}>
            <Input
              type="password"
              w="400px"
              placeholder="Password"
              mt="20px"
              value={password}
              onChange={handlePassword}
            />
          </FormControl>
          <FormControl isInvalid={isError}>
            <Input
              type="email"
              w="400px"
              placeholder="E-mail addres"
              mt="20px"
              value={email}
              onChange={handleEmail}
            />
          </FormControl>

          <Button
            colorScheme="blue"
            size="lg"
            w="400px"
            mt="20px"
            onClick={handleSignUp}
            isDisabled={!isEmail && isError}
          >
            Sign up
          </Button>

          <Box mt="20px" display="flex" justifyContent="end" w="400px">
            <Button
              colorScheme="blue"
              variant="outline"
              ml="10px"
              color="gray"
              _hover={{ color: "blue" }}
            >
              <NavLink to="/sign-in">Sign In</NavLink>
            </Button>
          </Box>
        </Box>
      </Center>
    </Center>
  );
};

export default PageSignUp;
