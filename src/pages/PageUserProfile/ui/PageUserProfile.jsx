import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCards, selectIsLoading } from "app/redux/slices/photoReducer";
import { MyCard } from "pages/PageCards/ui/Card";
import { Box, Button, Center, Input, Spinner } from "@chakra-ui/react";

import UpdateCardModal from "pages/Modals/UpdateCardModal/UpdateCardModal";
import Pagination from "components/Pagination/Pagination";

const PageUserProfile = () => {
  const cardsFromServer = useSelector((state) => state.photos.data);
  const isLoading = useSelector(selectIsLoading);

  const [page, setPage] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [openEditPopap, setOpenEditPopap] = useState(false);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [id, setId] = useState("");

  const dispatch = useDispatch();

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };
  const hanleCloseEditPopap = () => {
    setOpenEditPopap(false);
  };
  const hanleOpenEditPopap = ({ title, url, id }) => {
    setOpenEditPopap(true);
    setTitle(title);
    setUrl(url);
    setId(id);
  };

  useEffect(() => {
    dispatch(getCards({ }));
  }, [dispatch]);

  return (
    <Box>
      <Box>
        <Input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="search card"
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
          // onClick={handleSearch}
        >
          Search
        </Button>
        <Button
          maxWidth={"4%"}
          mt={"80px"}
          ml={"90%"}
          bgColor={"white"}
          position={"absolute"}
          // onClick={handleClearSearch}
        >
          Clear
        </Button>
      </Box>

      {isLoading ? (
        <Center minHeight={"100vh"} bgColor="black">
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
          bgColor="black"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          minHeight={"100vh"}
          pt={"150px"}
        >
          {cardsFromServer.map((data) => {
              return <MyCard key={data.id} data={data} onOpenEditPopap={hanleOpenEditPopap}/>;
            })}
            <UpdateCardModal
            isOpen={openEditPopap}
            onCloseEditPopap={hanleCloseEditPopap}
            title={title}
            url={url}
            id={id}
            handleChangeTitle={handleChangeTitle}
            handleChangeUrl={handleChangeUrl}
          />
        </Box>
      )}
      
      <Center>
        <Pagination page={page} setPage={setPage} />
      </Center>
    </Box>
  );
};

export default PageUserProfile;
