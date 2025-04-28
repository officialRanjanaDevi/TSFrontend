import Link from "next/link";
import React, { useState } from "react";

// import {smapleImg} from "/images/imagem1.png";
export default function CircularCard({ card }) {
  return (
    <>
      <div className="flex flex-col items-center hover:font-semibold">
        <Link href={`/subcategory/${card._id}`}>
          <div
            className={`transition-all ease-in-out duration-300 w-[82px] md:w-24 lg:w-48 h-[82px] md:h-24 lg:h-48 rounded-full overflow-hidden hover:shadow-lg p-2 `}
          >
            <img
              width={500}
              height={500}
              src={`${card?.image?.url}`}
              alt={card.name}
              className="object-cover w-full h-full rounded-full"
            />
          </div>

          <div className="w-full mt-2">
            <p className="w-full h-30 font-poppins text-center text-xs lg:text-base leading-[150%]">
              {card.name}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}
