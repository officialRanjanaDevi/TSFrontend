import React from "react";
import ProductCard from "./ProductCard";
import { Carousel } from "antd";

const ProductGrid = ({ products }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <div className="flex gap-6">
      {products?.map((product, key) => (
        <ProductCard key={key} productDetails={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
