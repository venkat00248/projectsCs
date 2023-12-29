import React from "react";
import './Images.scss'
export const Images = ({ images, startIndex }:any) => {
  return (
    <div className="imageContainer">

{images.slice(startIndex, startIndex + 5).map((imagePath:any, index:any) => (
          <div className="listContainer" key={index}>
            <img src={imagePath} alt="" />
          </div>
        ))}
      {/* <div className="listContainer">
        <img src="/images/viewers-disney.png" alt="" />
      </div>
      <div className="listContainer">
        <img src="/images/viewers-pixar.png" alt="" />
      </div>
      <div className="listContainer">
        <img src="/images/viewers-marvel.png" alt="" />
      </div>
      <div className="listContainer">
        <img src="/images/viewers-starwars.png" alt="" />
      </div>
      <div className="listContainer">
        <img src="/images/viewers-national.png" alt="" />
      </div> */}
      
    </div>
  );
};
