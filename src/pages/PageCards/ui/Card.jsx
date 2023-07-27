import React, { useState } from "react";
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

import { AiOutlineHeart } from "react-icons/ai";
// AiFillHeart

import { BiCommentDetail } from "react-icons/bi";

import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { deleteCard } from "app/redux/slices/photoReducer";

export const MyCard = ({ data, onOpenEditPopap }) => {
  const handleGetCorrectDate = (data) => {
    let date = new Date(data.date);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const dispach = useDispatch(); // для передачи данных с компонента в хранилище, изменяет состояние

  const handlOpenPopapEditeCard = () => {
    onOpenEditPopap({
      title: data.title,
      url: data.url,
      ownerId: data.ownerId,
    });
  };

  const handelDeleteCard = () => {
    dispach(deleteCard({ id: data.id, ownerId: "1" }));
  };

  return (
    <Card maxW="350px" borderRadius={10} maxH="500px">
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
          {data.title}
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
            >
              <Icon as={AiOutlineHeart} w={5} h={5} />
            </Button>
            <Button
              variant="ghost"
              p={0}
              borderWidth={2}
              borderColor="gray.300"
            >
              <Icon as={BiCommentDetail} w={5} h={5} />
            </Button>
          </ButtonGroup>
          <Text>{handleGetCorrectDate(data)}</Text>
        </Box>
        <Text>{data.likes} likes</Text>
      </CardFooter>
    </Card>
  );
};
