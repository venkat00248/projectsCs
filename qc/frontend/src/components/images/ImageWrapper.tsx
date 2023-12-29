import React, { useState } from 'react'
import { Images } from './Images'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import './ImageWrapper.scss'

export const ImageWrapper = () => {
    const [startIndex, setStartIndex] = useState(0);
    const images = [
        "/images/viewers-disney.png",
        "/images/viewers-pixar.png",
        "/images/viewers-marvel.png",
        "/images/viewers-starwars.png",
        "/images/viewers-national.png",
        "/images/viewers-pixar.png",
        "/images/viewers-marvel.png",
        "/images/viewers-starwars.png",
        "/images/viewers-national.png",
        "/images/viewers-disney.png",
        "/images/viewers-marvel.png",
        "/images/viewers-starwars.png",
        "/images/viewers-national.png",
        "/images/viewers-disney.png",
        // Add more image paths here as needed
      ];
      const handleClickNext = () => {
        console.log("index")
        const nextStartIndex = Math.min(startIndex + 5, images.length - 1);
        setStartIndex(nextStartIndex);
      };
    
      const handleClickPrev = () => {
        const prevStartIndex = Math.max(startIndex - 5, 0);
        setStartIndex(prevStartIndex);
      };
  return (
    <div style={{position:"relative"}}>
         <div className="slider2">
        {startIndex > 0 && (
          <ChevronLeftIcon
            style={{ color: "red", width: "40px", height: "40px" }}
            onClick={handleClickPrev}
          />
        )}
      </div>
        <Images images={images} startIndex={startIndex} />
        <div className="slider">
        {startIndex + 5 <=images.length && ( // Check if there are more images to show
          <ChevronRightIcon
            style={{ color: "red", width: "40px", height: "40px" }}
            onClick={handleClickNext}
          />
        )}
      {/* <ChevronRightIcon style={{color:"red", width:"40px", height:"40px"}}  onClick={handleClickNext}/> */}
      </div>
    </div>
  )
}
