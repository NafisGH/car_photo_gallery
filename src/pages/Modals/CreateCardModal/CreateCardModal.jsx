import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
} from "@chakra-ui/react";



import { useDispatch } from "react-redux";
import { createCard } from "app/redux/slices/photoReducer";

const CreateCardModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [title, setTitle] = useState('');
  const [url, setUrl] = useState('');

  const handleChangeTitle = (e) => {
    setTitle(e.target.value)
  }
  const handleChangeUrl = (e) => {
    setUrl(e.target.value)
  }

  const  dispach = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault()
      dispach(createCard({ownerId: 1, title, url}))
  }


  return (
    <>
      <Button onClick={onOpen}>Create new card</Button>
      

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your new card</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>TITLE</FormLabel>
              <Input ref={initialRef} placeholder="Card name" value={title} onChange={handleChangeTitle}/>
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>AUTHOR</FormLabel>
              <Input placeholder="Сard author" />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>URL</FormLabel>
              <Input placeholder="url pictures" value={url} onChange={handleChangeUrl}/>
            </FormControl>

            {/* <Box class="field-input upload-file">
              <Box
                class="drop-area"
                display="flex"
                justifyContent="center"
                alignItems="center"
                flexDirection="column"
                position="relative"
              >
                <Image
                  //   boxSize="150px"
                  width="300px"
                  height="200px"
                  objectFit="cover"
                  border="dashed"
                  borderRadius="15px"
                  mt="15px"
                />
                <Icon
                  as={BiDownload}
                  w={10}
                  h={10}
                  position="absolute"
                  m="50% 50% 50% 50%"
                />
                <Input type="file" accept="image/*" display="none" />
                <Button  mt="15px" w="150px">
                  Upload
                </Button>
              </Box>
            </Box> */}
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-around">
            <Button  w="150px" onClick={handleSubmit}>
              Create
            </Button>
            <Button onClick={onClose} w="150px">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCardModal;
