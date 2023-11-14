import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import {
  createCard,
  getCards,
  selectData,
  selectPage,
  selectPageCount,
} from "app/redux/slices/photoReducer";
import "./createCardModal.scss";
import "../modals.scss";

const CreateCardModal = ({ active, setActive }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [description, setDescription] = useState("");

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };
  const isError = title === "";
  const regExpUrl =
    /https?:\/\/(www\.)?[-\w@:%\.\+~#=]{1,256}\.[a-z0-9()]{1,6}\b([-\w()@:%\.\+~#=//?&]*)/i;

  const isRegExp = regExpUrl.test(url) ? true : false;

  const handleChangeAuthor = (e) => {
    setDescription(e.target.value);
  };
  const handleChangeUrl = (e) => {
    setUrl(e.target.value);
  };

  const clearInputs = () => {
    setTitle("");
    setDescription("");
    setUrl("");
  };

  const cards = useSelector(selectData); // Массив одной страницы, количество карточек на странице
  const page = useSelector(selectPage); // Активная выбранная страница
  const pageCount = useSelector(selectPageCount); //
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createCard({ ownerId: 2, title, description, url })).unwrap();

    if (cards.length > 4) {
      await dispatch(getCards({ page: pageCount + 1, pageSize: 5 })).unwrap();
    } else {
      await dispatch(getCards({ page, pageSize: 5 })).unwrap();
    }

    setActive(false);
    clearInputs();
  };

  const handelCancelCreatemodal = () => {
    clearInputs();
    setActive(false);
  };

  return (
    <>
      <h2 className="modal__create_header">Create your new card</h2>
      <AiOutlineCloseCircle
        className="modal__create_close"
        onClick={() => handelCancelCreatemodal()}
      />
      <div className="modal__create_body">
        <input
          className={!isError ? "input_create" : "input_create error"}
          placeholder="name card"
          value={title}
          onChange={handleChangeTitle}
        />
        <input
          className={!isError ? "input_create" : "input_create error"}
          placeholder="description"
          value={description}
          onChange={handleChangeAuthor}
        />
        <input
          className={!isError ? "input_create" : "input_create error"}
          placeholder="https://"
          value={url}
          onChange={handleChangeUrl}
        />
      </div>
      <div className="modal__create_footer">
        {!isError && isRegExp ? (
          <button className="modal__btn_create" onClick={handleSubmit}>
            Create
          </button>
        ) : (
          <button className="modal__btn_create disabled">Create</button>
        )}
        <button className="modal__btn_cancel" onClick={() => handelCancelCreatemodal()}>
          Cancel
        </button>
      </div>
    </>
  );
};

export default CreateCardModal;
