import { Box, Center, Text, Input, Button } from '@chakra-ui/react'
import React from 'react'




const PageSignUp = () => {
  return (
    <Center>
      <Center mt="100px" border="1px solid black" w="450px" h="500px">
        <Box display="flex" flexDir="column" alignItems="center">
          <Text fontSize="5xl">Sign up</Text>
          <Input type="text" w="400px" placeholder="Email" mt="20px" />
          <Input type="password" w="400px" placeholder="Password" mt="20px" />
          <Button colorScheme="blue" size="lg" w="400px" mt="20px">
            Sign up
          </Button>
          <Button colorScheme="red" size="sm" w="400px" mt="20px">
            Cancel
          </Button>
          <Box mt='10px' display='flex' justifyContent='space-around' w='450px'>
          <Button colorScheme='twitter' >Twitter</Button>
          <Button colorScheme='facebook'>Facebook</Button>
          <Button colorScheme='linkedin'>Google</Button>
          </Box>
          
        </Box>
        
      </Center>
    </Center>
  )
}

export default PageSignUp