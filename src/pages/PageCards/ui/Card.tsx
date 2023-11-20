import React from "react";
import "./card.scss";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import { useSelector } from "react-redux";
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
import { useAppDispatch } from "app/redux/store";

export interface DataCardsType {
  author: string;
  title: string;
  description: string;
  url: string;
  ownerId: number;
  id: number;
  date: number;
  likes?: any;
}
interface MyCardProps {
  data: DataCardsType;
  onOpenEditPopap: Function;
}

export const MyCard: React.FC<MyCardProps> = ({ data, onOpenEditPopap }) => {
  const { email, name } = useSelector(selectDataUser);
  const isMyCard = name === data.author ? true : false;

  const handleGetCorrectDate = (data: DataCardsType): string => {
    let date = new Date(data.date);
    let day = date.getDate();
    let res = "";
    if (day < 10) res = "0" + day;
    else res += "" + day;
    let month = (date.getMonth() + 1).toString();
    if (month.length === 1) res += ".0" + month;
    else res += "." + month;
    let year = date.getFullYear();
    if (year < 10) res += ".0" + year;
    else res += "." + year;
    return res;
  };

  const dispatch = useAppDispatch();

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
    dispatch(
      getCards({
        page,
        pageSize: 5,
        title: "",
      })
    ).unwrap();
  };

  const handleLikeCard = () => {
    if (data.likes && data.likes.includes(email)) {
      dispatch(dislikeCard({ id: data.id })); // email
    } else {
      dispatch(likeCard({ id: data.id })); // email
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

      <div className="cardBody">
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
