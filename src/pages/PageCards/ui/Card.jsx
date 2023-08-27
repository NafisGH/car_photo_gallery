import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  Box,
  Image,
  Heading,
  ButtonGroup,
  Button,
  Icon,
} from "@chakra-ui/react";

import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
  selectPage,
} from "app/redux/slices/photoReducer";

export const MyCard = ({ data, onOpenEditPopap }) => {
  const handleGetCorrectDate = (data) => {
    let date = new Date(data.date);

    let day = date.getDate();
    if (day < 10) day = "0" + day;

    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;

    let year = date.getFullYear();
    if (year < 10) year = "0" + year;

    return `${day}.${month}.${year}`;
  };

  const myEmail = "test02@m.ru";

  const dispach = useDispatch();

  const handlOpenPopapEditeCard = () => {
    onOpenEditPopap({
      title: data.title,
      url: data.url,
      ownerId: data.ownerId,
      id: data.id,
    });
  };

  const handelDeleteCard =  () => {
     dispach(deleteCard({ id: data.id, ownerId: data.ownerId }));
  };

  const handleLikeCard = () => {
    if (data.likes && data.likes.includes(myEmail)) {
      dispach(dislikeCard({ id: data.id, email: myEmail }));
    } else {
      dispach(likeCard({ id: data.id, email: myEmail }));
    }
  };

  return (
    <Card maxW="350px" borderRadius={10} maxH="550px">
      <CardHeader display="flex" justifyContent="flex-end" pb={5}>
        <ButtonGroup spacing={1}>
          <Button
            variant="ghost"
            p={0}
            borderWidth={2}
            borderColor="gray.300"
            onClick={handelDeleteCard}
          >
            <Icon as={DeleteIcon} w={5} h={5} />
          </Button>
          <Button
            variant="ghost"
            p={0}
            borderWidth={2}
            borderColor="gray.300"
            onClick={handlOpenPopapEditeCard}
          >
            <Icon as={EditIcon} w={5} h={5} />
          </Button>
        </ButtonGroup>
      </CardHeader>

      <CardBody padding="0 20px 0">
        <Heading size="md" mb={2}>
          Title: {data.title}
        </Heading>
        <Heading size="md" mb={2}>
          Author: {data.author}
        </Heading>
        <Image
          src={data.url}
          cursor="pointer"
          objectFit="cover"
          h="220px"
          w="100%"
        />
        <Text mt={2}>
          View a summary of all your customers over the last month.
        </Text>
      </CardBody>

      <CardFooter display="flex" flexDirection="column">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <ButtonGroup spacing={1}>
            <Button
              variant="ghost"
              p={0}
              borderWidth={2}
              borderColor="gray.300"
              onClick={handleLikeCard}
            >
              {data.likes && data.likes.includes(myEmail) ? (
                <Icon as={AiFillHeart} fill="red" w={5} h={5} />
              ) : (
                <Icon as={AiOutlineHeart} w={5} h={5} />
              )}
            </Button>
          </ButtonGroup>
          <Text>{handleGetCorrectDate(data)}</Text>
        </Box>
        <Text>{data.likes ? data.likes.length : 0} likes</Text>
      </CardFooter>
    </Card>
  );
};
