import React from "react";
import { add } from "../../assets/imgPath";
import "./createItemBtn.scss";

type TChild = {
  handleClick: () => any;
};

const CreateItemBtn = ({ handleClick }: TChild) => {
  return (
    <div className="card-wrapper new-card">
      <button className="card" onClick={handleClick}>
        <img src={add} alt="ajouter" />
      </button>
    </div>
  );
};

export default CreateItemBtn;
