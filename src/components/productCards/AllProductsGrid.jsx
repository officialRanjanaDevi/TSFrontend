import React, { useState } from "react";
import ProductCard from "./ProductCard";
import { useEffect } from "react";
import axios from "axios";

export default function AllProductsGrid({ cards, title }) {
  return (
    <>
      <div className="flex flex-col gap-2 my-3">
        <div className="text-2xl font-semibold lg:block">{title}</div>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-4">
          {cards.map((item, index) => (
            <ProductCard productDetails={item} key={index} />
          ))}
        </div>
      </div>
    </>
  );
}
