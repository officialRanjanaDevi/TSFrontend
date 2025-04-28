import React from "react";
import BrandCard from "./BrandCard";
import { Carousel } from "antd";

const BrandGrid = ({ products }) => {
  const settings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    slidesToShow: 4, // Display 4 cards at a time
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 10000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2, // Reduce number of cards on smaller screens
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2, // Reduce number of cards on smaller screens
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 1, // Display only 1 card on very small screens
        },
      },
    ],
  };
  return (
    <>
      {/* <div className="flex flex-row items-start justify-start w-full gap-5 pt-0 mt-2 md:mt-0"> */}
      <div className="w-full -ml-1">
        <Carousel {...settings}>
          {products?.map((product, index) => (
            <BrandCard key={index} productDetails={product} />
          ))}
        </Carousel>
      </div>
    </>
  );
};

export default BrandGrid;
