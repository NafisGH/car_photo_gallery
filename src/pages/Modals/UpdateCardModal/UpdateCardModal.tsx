import React, { ChangeEvent, FC, MouseEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCard } from "app/redux/slices/photoReducer";
import "./updateCardModal.scss";
import { AiOutlineCloseCircle } from "react-icons/ai";
import "./updateCardModal.scss";
import { useAppDispatch } from "app/redux/store";

export type ActiveDataType = {
  title: string;
  description: string;
  url: string;
  id: number;
};

export interface UpdateCardModalProps {
  active: {
    data: ActiveDataType;
  };
  isOpen: boolean;
  setActive: Function;
  onCloseEditPopap: Function;
  title: string;
  url: string;
  id: number;
  handleChangeTitle: Function;
  handleChangeUrl: Function;
  onClick: () => void;
}

const UpdateCardModal: FC<UpdateCardModalProps> = ({ active, setActive }) => {
  const { title, description, url, id } = active.data;
  const dispach = useAppDispatch();

  const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
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

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setInputTitle(e.target.value);
  const handleChangeDescription = (e: ChangeEvent<HTMLInputElement>) =>
    setInputDescription(e.target.value);
  const handleChangeUrl = (e: ChangeEvent<HTMLInputElement>) =>
    setInputUrl(e.target.value);

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
