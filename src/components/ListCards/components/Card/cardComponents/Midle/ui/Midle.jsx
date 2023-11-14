import React from "react";
import StyledMidle from "./StyledMidle";

export const Midle = (objectCard) => {
  const {
    objectCard: { title, author, url },
  } = objectCard; // Двойная деструктуризация

  return (
    <StyledMidle>
      <div className="midle">
        <h3 className="title">{title}</h3>
        <p className="author">{author}</p>
        <img src={url} alt="foto" />
      </div>
    </StyledMidle>
  );
};
