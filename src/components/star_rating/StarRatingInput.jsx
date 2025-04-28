import React, { useState } from "react";

const StarRatingInput = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="">
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={
              index <= (hover || rating) ? "text-yellow-500" : "text-gray-300"
            }
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="background-color-transparent border-none outline-none cursor-pointer text-[50px]">
              &#9733;
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRatingInput;
