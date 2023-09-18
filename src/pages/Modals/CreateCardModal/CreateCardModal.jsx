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
  FormErrorMessage,
} from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";
import {
  createCard,
  getCards,
  selectData,
  selectPage,
  selectPageCount,
  setPage,
} from "app/redux/slices/photoReducer";

const CreateCardModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const isError = title === "";
  const regExpUrl =
    /https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i;

  const isRegExp = regExpUrl.test(url) ? true : false;

  const handleChangeAuthor = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setUrl("");
  };

  const cards = useSelector(selectData); // Массив одной страницы, количество карточек на странице
  const page = useSelector(selectPage); // Активная выбранная страница
  const pageCount = useSelector(selectPageCount); //
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(
      createCard({ ownerId: 2, title, description, url })
    ).unwrap();

    if (cards.length > 4) {
      await dispatch(getCards({ page: pageCount + 1, pageSize: 5 })).unwrap();
    } else {
      await dispatch(getCards({ page, pageSize: 5 })).unwrap();
    }

    // await dispatch(getCards({ page, pageSize: 5 })).unwrap();
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
        <ModalContent mt={"20%"}>
          <ModalHeader>Create your new card</ModalHeader>
          <ModalCloseButton onClick={() => clearInputs()} />
          <ModalBody pb={6}>
            <FormControl isInvalid={isError}>
              <FormLabel>Title</FormLabel>
              <Input
                placeholder="name card"
                ref={initialRef}
                value={title}
                onChange={handleChangeTitle}
              />
              {!isError ? (
                ""
              ) : (
                <FormErrorMessage>Title is required.</FormErrorMessage>
              )}
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                // ref={initialRef}
                value={description}
                onChange={handleChangeAuthor}
              />
            </FormControl>

            <FormControl mt={4} isInvalid={isError}>
              <FormLabel>URL</FormLabel>
              <Input
                placeholder="https://"
                value={url}
                onChange={handleChangeUrl}
              />
              {!isError ? (
                ""
              ) : (
                <FormErrorMessage>url is required.</FormErrorMessage>
              )}
            </FormControl>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-around">
            <Button
              onClick={handelCancelCreatemodal}
              w="150px"
              bgColor={"silver"}
              _hover={{ bgColor: "gray" }}
            >
              Cancel
            </Button>

            {!isError && isRegExp ? (
              <Button onClick={handleSubmit} w="150px" bgColor={"silver"}>
                Create
              </Button>
            ) : (
              <Button w="150px" bgColor={"silver"} isDisabled>
                Create
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCardModal;
