import { Box, Center } from "@chakra-ui/react";
import React from "react";
import { Input, Button, Text } from "@chakra-ui/react";

const PageSignIn = () => {
  return (
    <Center>
      <Center mt="100px" border="1px solid black" w="450px" h="500px">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text fontSize="5xl">Sign in</Text>
          <Input type="text" w="400px" placeholder="Login/Email" mt="20px" />
          <Input type="password" w="400px" placeholder="Password" mt="20px" />
          <Button colorScheme="blue" size="lg" w="400px" mt="20px">
            Sign in
          </Button>
          <Button colorScheme="red" size="sm" w="100px" mt="20px">
            Cancel
          </Button>
        </Box>
      </Center>
    </Center>
  );
};

export default PageSignIn;
