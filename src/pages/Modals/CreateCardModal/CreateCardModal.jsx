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

import { useDispatch, useSelector } from "react-redux";
import { createCard, getCards, selectPage } from "app/redux/slices/photoReducer";

const CreateCardModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [author, setAuthor] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeAuthor = (e) => {
    setAuthor(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const clearInputs = () => {
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  const page = useSelector(selectPage);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCard({ ownerId: 2, title, author, url })).unwrap();
    await dispatch(getCards({ page, pageSize: 5 })).unwrap();
    onClose();
    clearInputs();
  };

  const handelCancelCreatemodal = () => {
    onClose();
    clearInputs();
  };

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
          <ModalCloseButton onClick={() => clearInputs()} />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>TITLE</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Card name"
                value={title}
                onChange={handleChangeTitle}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>AUTHOR</FormLabel>
              <Input 
                // ref={initialRef}
                placeholder="Сard author"
                value={author}
                onChange={handleChangeAuthor}  
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>URL</FormLabel>
              <Input
                placeholder="url pictures"
                value={url}
                onChange={handleChangeUrl}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-around">
            <Button onClick={handelCancelCreatemodal} w="150px">
              Cancel
            </Button>
            <Button onClick={handleSubmit} w="150px">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCardModal;
