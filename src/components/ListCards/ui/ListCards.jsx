import React, { useEffect } from "react";
import StyledListCards from "./StyledListCards";
import { Card } from "../components/Card";
import { useDispatch, useSelector } from "react-redux";
import { getCards } from "app/redux/slices/photoReducer";


export default function ListCards() {
  // const cards = [
  //   {
  //     id: "233",
  //     url: "https://images.unsplash.com/photo-1606942790567-5783bab8d944?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2FyJTIwcmV0cm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  //     title: "test01",
  //     author: "Jack R.",
  //     date: 1685523952171,
  //     likes: 0,
  //   },
  //   {
  //     id: "236",
  //     url: "https://images.unsplash.com/photo-1531420853064-43de9aa4366b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2FyJTIwcmV0cm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  //     title: "test02",
  //     author: "Bob T.",
  //     date: 1685523952171,
  //     likes: 0,
  //   },
  //   {
  //     id: "238",
  //     url: "https://images.unsplash.com/photo-1520116468816-95b69f847357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y2FyJTIwcmV0cm98ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
  //     title: "test03",
  //     author: "Feder L.",
  //     date: 1685523952171,
  //     likes: 0,
  //   },
  // ];



  // const cardFromServer = useSelector(state => state.photos.data)

  // const dispach = useDispatch();

  // useEffect(() => {
  //   dispach(getCards())
  // }, [dispach])

  return (
    <StyledListCards>
      {/* {cards.map((card) => {
        return <Card card={card} key={card.id} />;
      })} */}
      {/* {cardFromServer.map(item => <p key={item.id}>{item.title}</p>)} */}
    </StyledListCards>
  );
}
