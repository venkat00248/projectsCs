import React from "react";
import "./Wrapper.scss";
import { VideoPlayer } from "./VideoPlayer";
import { Images } from "../images/Images";
import { ImageWrapper } from "../images/ImageWrapper";
export const Wrapper = () => {

  return ( 
 <div className="wrapper">
    <VideoPlayer />
    <ImageWrapper />
  {/* rgb(15 16 20); */}

  </div>
  )
};
