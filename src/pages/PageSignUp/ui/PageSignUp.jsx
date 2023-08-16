import { Box, Center, Text, Input, Button } from '@chakra-ui/react'
import React from 'react'
import { NavLink } from 'react-router-dom'




const PageSignUp = () => {
  return (
    <Center>
      <Center mt="100px" border="1px solid black" w="450px" h="500px">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text fontSize="5xl">Sign up</Text>
          <Input type="text" w="400px" placeholder="Username" mt="20px" />
          <Input type="password" w="400px" placeholder="Password" mt="20px" />
          <Input type="password" w="400px" placeholder="Confirm password" mt="20px" />
          <Input type="email" w="400px" placeholder="E-mail addres" mt="20px" />
          
          <Button colorScheme="blue" size="lg" w="400px" mt="20px">
            Sign up
          </Button>
          
          
          <Box mt="20px" display="flex" justifyContent="end" w='400px'>
            <Button colorScheme="blue"
              variant="outline"
              ml="10px"
              color="gray"
              _hover={{ color: "blue" }}>
              <NavLink to="/sign-in">Sign In</NavLink>
            </Button>
          </Box>
          
        </Box>
        
      </Center>
    </Center>
  )
}

export default PageSignUp