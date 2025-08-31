import React from "react";
import "../../../scss/components/animeCards.scss";
import { slideImagesArr } from "../../../utils/StaticData";

const AnimeCards = ({name,images}) => {
  return (
    <div data-component="anime-card">
      <div className="image-container">
        <img alt={name} className="image" src={images||slideImagesArr[0]} />
      </div>
      <div className="details">
        <p className="name">{name}</p>
      </div>
    </div>
  );
};

export default AnimeCards;
