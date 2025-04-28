// StoreReviewSec.js
import React, { useState } from "react";
import StoreReviewsCard from "./StoreReviwesCard";

const StoreReviewSec = ({ storeReviews}) => {
  //console.log("storeReviews",storeReviews)
  return (
    <div className="w-full">
      <span className="font-Poppins ml-2 mb-6  2xl:leading-1 text-xl font-semibold" >
        Store Reviews
      </span>
      <div className="">
        <StoreReviewsCard items={storeReviews}  />
      </div>
    </div>
  );
};

export default StoreReviewSec;
