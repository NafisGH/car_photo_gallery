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
  // const [modalUpdateActive, setModalUpdateActive] = useState(false);
  // const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  // const [url, setUrl] = useState("");
  // const [id, setId] = useState("");

  const dispatch = useDispatch();

  const page = useSelector(selectPage);
  // const handleChangeTitle = (e) => setTitle(e.target.value);
  // const handleChangeDescription = (e) => setDescription(e.target.value);
  // const handleChangeUrl = (e) => setUrl(e.target.value);

  // const hanleCloseEditPopap = () => setOpenEditPopap(false);

  const hanleOpenEditPopap = (dataCard) => {
    setOpenEditPopap({ isOpen: true, data: dataCard });
    // setOpenEditPopap(true);
    // setTitle(title);
    // setDescription(description);
    // setUrl(url);
    // setId(id);
  };

  const changePage = (page) => dispatch(setPage(page));

  const handleSearch = () => {
    dispatch(getCards({ page, pageSize: 5, title: searchValue }));
  };

  // const handleClearSearch = () => {
  //   setSearchValue("");
  //   dispatch(getCards({ page, pageSize: 5 }));
  // };

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
