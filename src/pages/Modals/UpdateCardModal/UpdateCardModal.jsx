import React from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "app/redux/slices/photoReducer";
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
} from "@chakra-ui/react";

const UpdateCardModal = ({
  onCloseEditPopap,
  isOpen,
  title,
  description,
  url,
  id,
  handleChangeUrl,
  handleChangeTitle,
  handleChangeDescription,
}) => {
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const dispach = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispach(updateCard({ id, title, description, url }));
    onCloseEditPopap();
  };

  return (
    <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onCloseEditPopap}
      >
        <ModalOverlay />
        <ModalContent mt={"20%"}>
          <ModalHeader>Update card</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Card name"
                value={title}
                onChange={handleChangeTitle}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Input
                ref={initialRef}
                placeholder="Description"
                value={description}
                onChange={handleChangeDescription}
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
            <Button onClick={onCloseEditPopap} w="150px">
              Cancel
            </Button>
            <Button w="150px" onClick={handleSubmit}>
              Update
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UpdateCardModal;
