import React from "react";
import CircularCard from "../productCards/CircularCard";

const CircularCardGrid = ({ cards, title }) => {
  return (
    <div className="flex flex-col px-4 my-5 lg:p-0">
      <div className="text-2xl font-semibold lg:block">{title}</div>
      <div className="flex flex-row items-start justify-start w-full gap-2 overflow-auto grid-container lg:gap-4">
        {cards?.length > 0 &&
          cards.map((card, index) => <CircularCard key={index} card={card} />)}
      </div>
    </div>
  );
};

export default CircularCardGrid;
