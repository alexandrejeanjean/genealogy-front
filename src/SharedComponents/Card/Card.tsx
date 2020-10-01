import React from "react";
import { deletePic } from "../../assets/imgPath";
import "./card.scss";

type TCard = {
  text: string;
  subtext?: string;
  picture: any;
  handleClick: () => any;
  handleDelete: () => any;
};

const Card = ({ text, subtext, handleClick, handleDelete, picture }: TCard) => {
  return (
    <div className="card-wrapper">
      <button className="card" onClick={() => handleClick()}>
        <img src={picture} alt="" />
        <p className="card-text">{text}</p>
        <p className="card-subtext"> {subtext}</p>
      </button>
      <button className="delete-btn" onClick={() => handleDelete()}>
        <img src={deletePic} alt="delete button" />
      </button>
    </div>
  );
};

export default Card;
