import React, { useEffect, useState } from "react";
import { MyCard } from "./Card";
import { useSelector } from "react-redux";
import {
  getCards,
  selectData,
  selectIsLoading,
  selectPage,
  setPage,
} from "app/redux/slices/photoReducer";
import UpdateCardModal from "pages/Modals/UpdateCardModal/UpdateCardModal";
import Pagination from "components/Pagination/Pagination";
import "./pageCards.scss";
import Modal from "pages/Modals/ui/Modal";

import { DataCardsType } from "./Card";
import { useAppDispatch } from "app/redux/store";

interface DataPageCardsType {
  author: string;
  title: string;
  description: string;
  url: string;
  ownerId: number;
  id: number;
}

const PageCards = () => {
  const cardsFromServer = useSelector(selectData);
  const isLoading = useSelector(selectIsLoading);

  const [searchValue, setSearchValue] = useState("");
  const [openEditPopap, setOpenEditPopap] = useState({
    isOpen: false,
    data: {},
  });

  const dispatch = useAppDispatch();

  const page = useSelector(selectPage);

  const hanleOpenEditPopap = (dataCard: DataPageCardsType) => {
    setOpenEditPopap({ isOpen: true, data: dataCard });
  };

  const changePage = (page: number) => dispatch(setPage(page));

  const handleSearch = () => {
    dispatch(getCards({ page, pageSize: 5, title: searchValue }));
  };

  useEffect(() => {
    dispatch(getCards({ page, pageSize: 5, title: searchValue }));
  }, [dispatch, page]);

  const handleCloseUpdatePopap = () => {
    setOpenEditPopap({ isOpen: false, data: {} });
  };

  return (
    <div className="pageCards">
      <div className="searchCard">
        <input
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="search by title"
        />
        <button className="btnSearch" onClick={handleSearch}>
          Search
        </button>
      </div>

      {isLoading ? (
        <div className="spinner">
          <span className="loader"></span>
        </div>
      ) : (
        <div className="pageCards">
          {cardsFromServer &&
            cardsFromServer.map((data: DataCardsType) => {
              return (
                <MyCard key={data.id} data={data} onOpenEditPopap={hanleOpenEditPopap} />
              );
            })}

          <Modal active={openEditPopap.isOpen} setActive={handleCloseUpdatePopap}>
            <UpdateCardModal
              active={openEditPopap}
              setActive={handleCloseUpdatePopap}
            ></UpdateCardModal>
          </Modal>
        </div>
      )}

      <Pagination page={page} setPage={changePage} />
    </div>
  );
};

export default PageCards;
