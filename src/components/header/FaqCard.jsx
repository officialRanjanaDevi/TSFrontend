import React from "react";
import Image from "next/image";


const FeedbackCard = ({ title, content, id, opened, setOpened }) => {
  const isOpen = opened === id;

  return (
    <div
      onClick={() => setOpened(isOpen ? null : id)}
      className="z-10 my-1 border w-full  cursor-pointer mt-2 md:mt-0 shadow-sm"
    >
      {/* Title + Icon */}
      <div className="flex justify-between p-4">
        <h1 className="text-xl font-semibold">{title}</h1>

        <Image
          width={20}
          height={20}
          src={isOpen ? "/icons/up.svg" : "/icons/down.svg"}
          alt={isOpen ? "Collapse" : "Expand"}
          className="h-5 cursor-pointer"
        />
      </div>

      {/* Content */}
      {isOpen && <p className="p-4 w-full text-gray-700">{content}</p>}
    </div>
  );
};

export default FeedbackCard;
