"use client";
import React, { useState } from "react";

const StarRating = ({ stars }) => {
  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= stars ? "text-yellow-500" : "text-gray-300"}
          >
            <span className="background-color-transparent border-none outline-none cursor-pointer text-[40px]">
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
