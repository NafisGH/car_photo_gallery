// import { ListCards } from 'components/ListCards'
import React, { useEffect, useState } from "react";
import { MyCard } from "./Card";

import { Box, Input } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "app/redux/slices/photoReducer";
import UpdateCardModal from "pages/Modals/UpdateCardModal/UpdateCardModal";

const PageCards = () => {
  const cardsFromServer = useSelector((state) => state.photos.data);

  // const state = useSelector((state) => state)

  const dispatch = useDispatch();

  const [openEditPopap, setOpenEditPopap] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

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
    dispatch(getCards());
  }, [dispatch]);

  return (
    <Box>
      <Box>
        <Input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="search card" size="md" />
      </Box>

      <Box
        display="grid"
        p={10}
        gridTemplateColumns={"repeat(auto-fit, minmax(250px, 1fr))"}
        gap={10}
        height="100vw"
        bgColor="gray"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
      >
        {cardsFromServer
        .filter((data) => {
          return data.title.toLowerCase().includes(searchValue.toLowerCase())
        })
        .map((data) => {
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
    </Box>
  );
};

export default PageCards;
