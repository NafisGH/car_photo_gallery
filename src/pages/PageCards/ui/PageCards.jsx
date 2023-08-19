// import { ListCards } from 'components/ListCards'
import React, { useEffect, useState } from "react";
import { MyCard } from "./Card";

import { Box, Center, Input, Spinner } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "app/redux/slices/photoReducer";
import UpdateCardModal from "pages/Modals/UpdateCardModal/UpdateCardModal";
import Pagination from "components/Pagination/Pagination";

const PageCards = () => {
  const cardsFromServer = useSelector((state) => state.photos.data);

  const [page, setPage] = useState(1);



  const dispatch = useDispatch();

  const [openEditPopap, setOpenEditPopap] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [isLoading, setLoading] = useState(true);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const hanleCloseEditPopap = () => {
    setOpenEditPopap(false);
  };
  const hanleOpenEditPopap = ({ title, url }) => {
    setOpenEditPopap(true);
    setTitle(title);
    setUrl(url);
  };

  useEffect(() => {
    dispatch(getCards({ setLoading, page, pageSize: 5 }));
  }, [dispatch, page]);

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
          bgColor={"white"}
          maxWidth={"95%"}
        />
      </Box>

      {isLoading ? (
        <Center>
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
            mt="20%"
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
        >
          {cardsFromServer
            .filter((data) => {
              return data.title
                .toLowerCase()
                .includes(searchValue.toLowerCase());
            })
            .map((data, index) => {
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
            url={url}
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

export default PageCards;
