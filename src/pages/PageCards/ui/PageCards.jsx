import React, { useEffect, useState } from "react";
import { MyCard } from "./Card";

import { Box, Button, Center, Input, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import {
  getCards,
  selectIsLoading,
  selectPage,
  setPage,
} from "app/redux/slices/photoReducer";
import UpdateCardModal from "pages/Modals/UpdateCardModal/UpdateCardModal";
import Pagination from "components/Pagination/Pagination";

const PageCards = () => {
  const cardsFromServer = useSelector((state) => state.photos.data);
  const isLoading = useSelector(selectIsLoading);

  const [searchValue, setSearchValue] = useState("");
  const [openEditPopap, setOpenEditPopap] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");
  console.log(openEditPopap);

  const dispatch = useDispatch();

  const page = useSelector(selectPage);
  const handleChangeTitle = (e) => setTitle(e.target.value);
  const handleChangeDescription = (e) => setDescription(e.target.value);
  const handleChangeUrl = (e) => setUrl(e.target.value);

  const hanleCloseEditPopap = () => setOpenEditPopap(false);

  const hanleOpenEditPopap = ({ title, description, url, id }) => {
    setOpenEditPopap(true);
    setTitle(title);
    setDescription(description);
    setUrl(url);
    setId(id);
  };

  const changePage = (page) => dispatch(setPage(page));

  const handleSearch = () => {
    dispatch(getCards({ page, pageSize: 5, title: searchValue }));
  };

  const handleClearSearch = () => {
    setSearchValue("");
    dispatch(getCards({ page, pageSize: 5 }));
  };

  useEffect(() => {
    dispatch(getCards({ page, pageSize: 5, title: searchValue }));
  }, [dispatch, page]);

  return (
    <Box>
      <Box>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="search by title"
          size="md"
          position={"absolute"}
          mt={"80px"}
          ml={"10px"}
          bgColor={"white"}
          maxWidth={"80%"}
        />
        <Button
          maxWidth={"4%"}
          mt={"80px"}
          ml={"85%"}
          bgColor={"white"}
          position={"absolute"}
          onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          maxWidth={"4%"}
          mt={"80px"}
          ml={"90%"}
          bgColor={"white"}
          position={"absolute"}
          onClick={handleClearSearch}
        >
          Clear
        </Button>
      </Box>

      {isLoading ? (
        <Center minHeight={"100vh"} bgColor="silver">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mt="15%"
          />
        </Center>
      ) : (
        <Box
          display="grid"
          p={10}
          gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
          gap={10}
          bgColor="silver"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          minHeight={"100vh"}
          pt={"150px"}
          pb={100}
        >
          {cardsFromServer &&
            cardsFromServer.map((data) => {
              return (
                <MyCard
                  key={data.id}
                  data={data}
                  onOpenEditPopap={hanleOpenEditPopap}
                />
              );
            })}

          <UpdateCardModal
            isOpen={openEditPopap}
            onCloseEditPopap={hanleCloseEditPopap}
            title={title}
            description={description}
            url={url}
            id={id}
            handleChangeTitle={handleChangeTitle}
            handleChangeDescription={handleChangeDescription}
            handleChangeUrl={handleChangeUrl}
          />
        </Box>
      )}

      <Center>
        <Pagination page={page} setPage={changePage} />
      </Center>
    </Box>
  );
};

export default PageCards;
