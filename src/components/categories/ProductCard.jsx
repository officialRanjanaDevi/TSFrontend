"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border-2 border-[#EB8105] p-7 rounded-md shadow-md">
        <p className="text-black">{message}</p>
        <button
          onClick={onClose}
          className="mt-4 bg-[#EB8105] text-white px-4 py-2 rounded-md hover:bg-[#FAAC06]"
        >
          Ok
        </button>
      </div>
    </div>
  );
};

const ProductCard = ({ productDetails }) => {
  const [showPopup, setShowPopup] = useState(false);
  const discount = Math.floor(
    ((productDetails?.Size?.L?.MRP - productDetails?.Size?.L?.trialshopyPrice) / productDetails?.Size?.L?.MRP) * 100
  );
  
  return (
    
    <>
       <Link href={`/products/details?productId=${productDetails._id}`} className="  max-w-64  border-2 flex flex-col items-start justify-between h-full w-full  shadow-lg p-2 shrink-0 ">

    <div className="w-full  h-48 relative">
      <img
        src={productDetails?.productImage|| "/noImage.png"}
        alt="productDetails"
        className="w-full  h-full "
      
      />
      <div className="w-5 h-5 absolute top-2 right-2">
        <Image
          src={"/images/store/add_to_wishlist.svg"}
          width={20}
          height={20}
          className={`w-full h-full`}
          alt="heart"
        />
      </div>
    </div>

    <div className="flex flex-col w-full item-start ">
      <Link href={`/products/details?productId=${productDetails?._id}`}>
        <h2 className="font-semibold whitespace-nowrap truncate">{productDetails?.productName}</h2>
      </Link>
      <p className="font-light h-[20px] pb-5 text-gray-500 truncate">
        {productDetails?.shortDescription}
      </p>
      <div className="mt-2 flex flex-row items-center justify-between  w-full">
        <div className="flex flex-row gap-2 lg:gap-2 border-2 p-1 rounded">
          <p className="font-bold text-sm">₹{productDetails?.Size?.L?.trialshopyPrice}</p>
          <p className="font-light line-through text-sm">₹{productDetails?.Size?.L?.MRP}</p>
        </div>

        <p className="text-[green] text-sm">{discount}% off</p>
      </div>
      <div className=" hover:scale-[102%] duration-300 border-2 bg-neutral-100 mt-2 rounded text-center py-1 ">
        View Details
      </div>
    </div>
    </Link>
  </>
  );
};

export default ProductCard;
