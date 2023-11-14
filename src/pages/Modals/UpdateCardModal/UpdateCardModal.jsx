import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "app/redux/slices/photoReducer";
import "./updateCardModal.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./updateCardModal.scss";

const UpdateCardModal = ({ active, setActive }) => {
  const { title, description, url, id } = active.data;
  const dispach = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispach(
      updateCard({
        id,
        title: inputTitle,
        description: inputDescription,
        url: inputUrl,
      })
    );
    setActive(false);
  };

  const closeModalUpdate = () => {
    setActive(false);
  };

  const [inputTitle, setInputTitle] = useState(title);
  const [inputDescription, setInputDescription] = useState(description);
  const [inputUrl, setInputUrl] = useState(url);

  const handleChangeTitle = (e) => setInputTitle(e.target.value);
  const handleChangeDescription = (e) => setInputDescription(e.target.value);
  const handleChangeUrl = (e) => setInputUrl(e.target.value);

  useEffect(() => {
    setInputTitle(title);
  }, [title]);

  useEffect(() => {
    setInputDescription(description);
  }, [description]);

  useEffect(() => {
    setInputUrl(url);
  }, [url]);
  return (
    <>
      <h2 className="modal__update_header">Update card</h2>
      <AiOutlineCloseCircle
        className="modal__update_close"
        onClick={() => closeModalUpdate()}
      />
      <div className="modal__update_body">
        <input
          className="input__update"
          placeholder="Card name"
          value={inputTitle}
          onChange={handleChangeTitle}
        />
        <input
          className="input__update"
          placeholder="description"
          value={inputDescription}
          onChange={handleChangeDescription}
        />
        <input
          className="input__update"
          placeholder="url"
          value={inputUrl}
          onChange={handleChangeUrl}
        />
      </div>
      <div className="modal__footer">
        <button className="modal__btn_update" onClick={handleSubmit}>
          Update
        </button>

        <button className="modal__btn_cancel" onClick={() => closeModalUpdate()}>
          Cancel
        </button>
      </div>
    </>
    //
  );
};

export default UpdateCardModal;
