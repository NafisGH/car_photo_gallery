import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getCards } from "app/redux/slices/photoReducer";
import { MyCard } from "pages/PageCards/ui/Card";

import { Box, Center, Input, Spinner } from "@chakra-ui/react";

const PageUserProfile = () => {
  const cardsFromServer = useSelector((state) => state.photos.data);

  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCards({ isLoading, setLoading }));
  }, [dispatch]);

  return (
    <Box>
      <h1>User owner_id 2</h1>
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
          height="100vw"
          bgColor="gray"
          bgPosition="center"
          bgRepeat="no-repeat"
          bgSize="cover"
          minHeight={"100vh"}
          pt={"150px"}
        >
          {cardsFromServer
            .filter((data) => data.owner_id === 2)
            .filter((data) =>
              data.title.toLowerCase().includes(searchValue.toLowerCase())
            )
            .map((data) => {
              return <MyCard key={data.id} data={data} />;
            })}
            
        </Box>
      )}
      
    </Box>
  );
};

export default PageUserProfile;
