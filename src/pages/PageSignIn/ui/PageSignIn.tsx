import { Box, Center } from "@chakra-ui/react";
import React, { ChangeEvent, MouseEvent, useState } from "react";
import { Input, Button, Text } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { signIn } from "app/redux/slices/userReducer";
import { useAppDispatch } from "app/redux/store";

const PageSignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handelChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handelChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handelSubmit = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await dispatch(signIn({ password, email })).unwrap();
    navigate("/");
  };

  return (
    <Center>
      <Center mt="100px" border="1px solid black" w="450px" h="500px">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text fontSize="5xl">Sign in</Text>

          <Input
            type="text"
            w="400px"
            placeholder="Username or E-mail"
            mt="20px"
            value={email}
            onChange={handelChangeEmail}
          />
          <Input
            type="password"
            w="400px"
            placeholder="Password"
            mt="20px"
            value={password}
            onChange={handelChangePassword}
          />
          <Button
            colorScheme="blue"
            size="lg"
            w="400px"
            mt="20px"
            onClick={handelSubmit}
            isDisabled={!email || !password}
          >
            Sign in
          </Button>

          <Box mt="20px" display="flex" justifyContent="end" w="400px">
            <Button
              colorScheme="blue"
              variant="outline"
              ml="10px"
              color="gray"
              _hover={{ color: "blue" }}
            >
              <NavLink to="/sign-up">Sign Up</NavLink>
            </Button>
          </Box>
        </Box>
      </Center>
    </Center>
  );
};

export default PageSignIn;
