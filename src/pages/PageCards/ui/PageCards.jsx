import React, { useEffect, useState } from "react";
import { MyCard } from "./Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getCards,
  selectIsLoading,
  selectPage,
  setPage,
} from "app/redux/slices/photoReducer";
import UpdateCardModal from "pages/Modals/UpdateCardModal/UpdateCardModal";
import Pagination from "components/Pagination/Pagination";
import "./pageCards.scss";
import Modal from "pages/Modals/ui/Modal";

const PageCards = () => {
  const cardsFromServer = useSelector((state) => state.photos.data);
  const isLoading = useSelector(selectIsLoading);

  const [searchValue, setSearchValue] = useState("");
  const [openEditPopap, setOpenEditPopap] = useState({ isOpen: false, data: {} });

  const dispatch = useDispatch();

  const page = useSelector(selectPage);

  const hanleOpenEditPopap = (dataCard) => {
    setOpenEditPopap({ isOpen: true, data: dataCard });
  };

  const changePage = (page) => dispatch(setPage(page));

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
          <span class="loader"></span>
        </div>
      ) : (
        <div className="pageCards">
          {cardsFromServer &&
            cardsFromServer.map((data) => {
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
