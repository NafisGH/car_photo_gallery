import React from "react";
import "./card.scss";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteCard,
  dislikeCard,
  getCards,
  likeCard,
  selectPage,
} from "app/redux/slices/photoReducer";
import { selectDataUser } from "app/redux/slices/userReducer";
import { BsFillTrashFill } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";

export const MyCard = ({ data, onOpenEditPopap }) => {
  const { email, name } = useSelector(selectDataUser);
  const isMyCard = name === data.author ? true : false;
  const handleGetCorrectDate = (data) => {
    let date = new Date(data.date);
    let day = date.getDate();
    if (day < 10) day = "0" + day;
    let month = date.getMonth() + 1;
    if (month < 10) month = "0" + month;
    let year = date.getFullYear();
    if (year < 10) year = "0" + year;
    return `${day}.${month}.${year}`;
  };

  const dispatch = useDispatch();

  const page = useSelector(selectPage);

  const handlOpenPopapEditeCard = () => {
    onOpenEditPopap({
      title: data.title,
      description: data.description,
      url: data.url,
      ownerId: data.ownerId,
      id: data.id,
    });
  };

  const handelDeleteCard = async () => {
    await dispatch(deleteCard({ id: data.id, ownerId: data.ownerId })).unwrap();
    dispatch(getCards({ page, pageSize: 5 })).unwrap();
  };

  const handleLikeCard = () => {
    if (data.likes && data.likes.includes(email)) {
      dispatch(dislikeCard({ id: data.id, email }));
    } else {
      dispatch(likeCard({ id: data.id, email }));
    }
  };

  return (
    <div className="card">
      <div className="cardHeader">
        <div className="btnHeader">
          {isMyCard ? (
            <BsFillTrashFill
              className="btnTrash"
              onClick={handelDeleteCard}
            ></BsFillTrashFill>
          ) : (
            <BsFillTrashFill className="btnTrash disabled"></BsFillTrashFill>
          )}

          {isMyCard ? (
            <AiFillEdit
              className="btnEdit"
              onClick={handlOpenPopapEditeCard}
            ></AiFillEdit>
          ) : (
            <AiFillEdit className="btnEdit disabled"></AiFillEdit>
          )}
        </div>
      </div>

      <div className="cardBody" padding="0 20px 0">
        <h2>Title: {data.title}</h2>
        <h2>Author: {data.author}</h2>
        <img src={data.url} alt="foto" />
        <h2>description: {data.description}</h2>
      </div>

      <div className="cardFooter">
        <div>
          <button className="btnLike" onClick={handleLikeCard}>
            {data.likes && data.likes.includes(email) ? (
              <BsHeartFill size="20px" />
            ) : (
              <BsHeart size="20px" />
            )}
          </button>

          <span>{handleGetCorrectDate(data)}</span>
        </div>
        <span>{data.likes ? data.likes.length : 0} likes</span>
      </div>
    </div>
  );
};
