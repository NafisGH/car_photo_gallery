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
  url,
  id,
  handleChangeUrl,
  handleChangeTitle,
}) => {
  //   const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);

  const dispach = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispach(updateCard({ id: 4, title, url }));
    onCloseEditPopap()
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
        <ModalContent>
          <ModalHeader>Update card</ModalHeader>
          <ModalCloseButton />
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
