import React, { useState } from "react";
import Image from "next/image";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const StoreReviwesCard = ({ items,fetchReviews }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = (direction) => {
    const container = document.getElementById("reviewsContainer");

    if (container) {
      const scrollAmount = direction === "left" ? -200 : 200;
      container.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });

      setScrollPosition(container.scrollLeft + scrollAmount);
    }
  };

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(<AiFillStar key={i} className="text-[#FAC50C] mr-0.5" />);
    }

    if (hasHalfStar) {
      starIcons.push(
        <AiOutlineStar key={fullStars} className="text-gray-400" />
      );
    }

    return starIcons;
  };

  if (!items || !Array.isArray(items) || items.length === 0) {
    return (
      <div className="flex ml-4 text-black">
        <p>No Reviews yet!</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        id="reviewsContainer"
        className="flex flex-row gap-3 overflow-hidden grid-container"
        style={{ scrollBehavior: "smooth", scrollLeft: scrollPosition }}
      >
        {items.map((el) => {
          const { _id, userId, rating, reviewText } = el;
          // console.log("userId", userId);
          return (
            <div
              key={_id}
              className=" 2xl:w-[360px] md:w-[360px]  w-[184px] sm:w-[184px] h-auto bg-gray-800 ml-0 text-white flex flex-col items-center shrink-0  cursor-pointer pb-5"
            >
              <div className="gap-2.5 flex w-full mt-5">
                <Image
                  src={userId?.profilePic?.url || "/images/man.png"}
                  alt={userId?.name}
                  width={300}
                  height={300}
                  className="w-[34px] h-[34px] items-start ml-5"
                />
                <p className="w-full h-30 font-poppins text-sm lg:text-base leading-[150%] font-[600] ml-3 items-center mt-1">
                  {userId?.name}
                </p>
              </div>

              <div className="w-full">
                <div className="flex flex-row gap-2 my-2 mt-3 ml-5 text-xl text-gray-500">
                  {renderRatingStars(rating)}
                </div>
                <div className="title ml-5 px-1">
                  <p>{reviewText}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-r-md cursor-pointer"
        onClick={() => handleScroll("left")}
      >
        {"<"}
      </button>
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-l-md cursor-pointer"
        onClick={() => handleScroll("right")}
      >
        {">"}
      </button>
    </div>
  );
};

export default StoreReviwesCard;
