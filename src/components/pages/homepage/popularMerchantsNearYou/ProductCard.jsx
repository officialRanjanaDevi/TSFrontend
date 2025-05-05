"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
const img_fashion = "/images/img_fashion.jpeg";

const Popup = ({ message, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white border-2 border-[#EB8105] p-7 rounded-md shadow-md z-60">
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


const ProductCard = (props) => {
  const { productDetails } = props;
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [isFollowing, setIsFollowing] = useState(false);
  const [follow, setFollow] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {

      const isFollowing = productDetails.followers.followers.some(
        (follower) => follower._id === authenticated.user._id
      );
      setFollow(isFollowing);

  }, []);

  if (!productDetails) {
    return null; // or render a loading state or placeholder
  }

  const currentDate = new Date();
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayOfWeekIndex = currentDate.getDay();
  const dayName = daysOfWeek[dayOfWeekIndex];

  let closingTime;

  productDetails.openingHours.forEach((daytod) => {
    if (dayName === daytod.dayOfWeek) {
      closingTime = daytod.close;
    }
  });

  const handleFollow = async () => {
    if (!authenticated.user || !authenticated.user._id) {
      // If not logged in, show the popup
      setShowPopup(true);
      return; // Prevent further execution
    }
    const storeId = productDetails._id;
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/${storeId}/${
          follow ? "unfollow" : "follow"
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authenticated.token}`,
          },
        }
      );

      console.log(
        `${follow ? "Unfollowed" : "Followed"} store with ID ${storeId}:`,
        response.data
      );
      setFollow(!follow);
    } catch (error) {
      console.error(
        `Error ${follow ? "unfollowing" : "following"} store:`,
        error
      );
    }
  };

  useEffect(() => {
    const isFollowing =
      productDetails.followers &&
      productDetails.followers.followers.includes(authenticated.user._id);
    setFollow(isFollowing);
  }, [authenticated.user._id]);

  return (
    <div className="h-fit flex flex-col gap-2 items-center shadow-md rounded w-fit mx-auto border hover:shadow-lg">
      {showPopup && ( 
        <Popup
          message="User not logged in. Please log in to follow store."
          onClose={() => setShowPopup(false)} 
        />
      )}
      <div className="w-full max-w-[20rem] md:max-w-[20rem] p-1 sm:p-4">
        <div className="h-40 relative w-full min-w-[320px]   m-auto">
          <button
            onClick={handleFollow}
            className="md:block px-4 py-1 absolute right-2 top-2 border z-10 bg-white rounded-sm hover:bg-opacity-25 hover:text-white"
          >
            <p className="text-xs">{follow ? "Unfollow.." : "+ Follow"}</p>
          </button>
          <div className="px-2 py-1 flex flex-row items-center gap-2 cursor-pointer p-1 text-xs absolute bottom-2 left-2 bg-white border z-10 rounded-sm">
            <p className="px-1 py-0.5 bg-gray-600 text-white rounded-sm">
              ⭐ {productDetails.rating?.rating}
            </p>
            <p className="p-1">{productDetails.rating?.count} Ratings</p>
          </div>
          <div className="w-full boder-2 border-black absolute inset-0">
          <img
  className="w-full h-full  boder-2 border-black  object-cover rounded"
  src={
    productDetails?.images[0]?.url?.includes("imgur")? img_fashion
      : productDetails?.images[0]?.url
  }
  alt={productDetails?.images[0]?.url || "storeName"}
/>

          </div>
        </div>

        <Link href={"#"}>
          <div className="flex mt-2 w-[100%] items-start">
            <p className="font-semibold text-lg truncate">{productDetails.storeName}</p>
          </div>
        </Link>

        <div className="mt-2 flex flex-col w-full h-16 sm:h-20 p-0">
         
        <p className="text-sm truncate">{productDetails.storeDescription}</p>
         <div className="flex justify-between mt-2 text-sm">
          <p className="border  px-2 py-1 rounded border-2">Followers:{productDetails?.followers?.count}</p>
          <p className="border  px-2 py-1 rounded border-2">Reviews:{productDetails?.reviewCount}</p>
         </div>

       
        </div>

        <Link href={`/nearByStore/store?storeId=${productDetails._id}`}>
          <button className="flex items-center justify-center gap-2 w-full py-1 sm:py-2 px-9 border border-gray-400 bg-gray-50 hover:border-amber-500 rounded hover:bg-amber-500 hover:text-white">
            <p className="font-semibold"> View Shop</p>
          </button>
        </Link>

        <div className="flex flex-row items-center justify-between text-xs w-full mt-3">
          <div className="flex flex-row items-center gap-1">
            <span className="text-green-600 font-bold">Open</span>
            <p className="font-light">until {closingTime}</p>
          </div>

          <div className="flex flex-row gap-1 items-center ">
            <div className="">
              <Image
                src="/images/imap.svg"
                width={10}
                height={10}
                alt="SVG map icon"
              />
            </div>
            <span className="font-light">10km away</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
