"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";

export const Popup = ({ message, onClose }) => {
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

const ProductCard = ({ productDetails, defaultImage }) => {
  const {
    _id,
    productName,
    images,
    shortDescription,
    price,
    rating,
    discount,
    productImage,
    Size = {},
  } = productDetails;
  const [selectedSize, setSelectedSize] = useState();
  const sizePrice = Size[selectedSize]?.trialshopyPrice || Size["free size"]?.trialshopyPrice;
  const MRP= Size[selectedSize]?.MRP ||  Size["free size"]?.MRP;
  const discountedPrice = Math.floor(
    ((MRP - sizePrice) / MRP) * 100
  );
  

  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [showPopup, setShowPopup] = useState(false);
  const [favourite, setFavourite] = useState(false);

  useEffect(() => {
    const sizeKeys = Object.keys(Size || {});
    if (sizeKeys.length > 0) {
      setSelectedSize(sizeKeys[0]);
    }
  }, [Size]);

  useEffect(() => {
    setFavourite(
      authenticated.user.wishList && authenticated.user.wishList.includes(_id)
    );
  }, [authenticated.user, _id]);

  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const handleFavouriteClick = () => {
    if (!authenticated.user || !authenticated.user._id) {
      setShowPopup(true);
      return;
    }
    setFavourite(!favourite);

    let api = "";

    if (!favourite) {
      api = `${serverURL}/api/v1/addWishList/${authenticated.user._id}/${_id}`;
      axios
        .post(api)
        .then((res) => {
          setAuthenticated({
            ...authenticated,
            user: { ...authenticated.user, wishList: res.data.wishList },
          });
        })
        .catch((err) => console.error(err));
    } else {
      api = `${serverURL}/api/v1/deleteWishList/${authenticated.user._id}/${_id}`;
      axios
        .delete(api)
        .then((res) => {
          setAuthenticated({
            ...authenticated,
            user: { ...authenticated.user, wishList: res.data.wishList },
          });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <section className="max-w-44 sm:max-w-60 py-2 rounded body-font  hover:shadow-lg">
      {showPopup && (
        <Popup
          message="User not logged in. Please log in to add to wishlist."
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="max-w-44 sm:max-w-60  w-full p-1 md:p-2">
        <div className="flex flex-col items-center w-full gap-2">
          <div className="relative w-full">
            <Link href={`/products/details?productId=${_id}`}>
              <div className="relative  max-w-44 sm:max-w-60  w-full overflow-hidden">
                {productImage && (
                  <img
                    alt={productName}
              
                    className=" max-w-44 sm:max-w-60 pt-1 w-full h-[220px] lg:h-[256px] "
                    src={productImage || defaultImage?.url}
                  />
                )}
              </div>
            </Link>
            <div className="  absolute text-black py-0.5 lg:py-1  px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
              <h2 className="flex flex-row items-center gap-1 text-[8px] lg:text-sm font-semibold">
                <span className="">{rating?.rating}</span>
                <span className="">
                  <Image
                    alt="heart"
                    width={25}
                    height={25}
                    className="w-2 h-2 lg:w-4 lg:h-4 "
                    src={"/images/Vector2.svg"}
                  />
                </span>
                <span className="pl-1 border-l border-gray-400">
                  {rating?.count}
                </span>
              </h2>
            </div>
            <div className="absolute text-black right-2 lg:right-7 top-2 lg:top-3 ">
              <h2 className="">
                <button>
                  <Image
                    width={25}
                    height={25}
                    alt="heart"
                    className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
                    src={
                      favourite ? "/images/heart.svg" : "/images/Vector3.svg"
                    }
                    onClick={handleFavouriteClick}
                  />
                </button>
              </h2>
            </div>
          </div>

          <div className="max-w-full sm:max-w-60   flex flex-col items-start w-full gap-1">
            <Link href={`/products/details?productId=${_id}`}>
              <h3 className="font-poppins  lg:text-[18px] text-[14px] overflow-hidden line-clamp-1 font-medium">
                {productName}
              </h3>
            </Link>
            <p className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm line-clamp-2 text-ellipsis">
              {shortDescription}
            </p>
        
                  <div className="flex  justify-between items-center w-full">
                    <div className="flex ">
                      <span className="pr-1 text-xs font-bold lg:text-sm">
                        ₹{sizePrice}
                      </span>
                      <span className="px-1 text-xs font-light line-through lg:text-sm">
                        ₹{MRP}
                      </span>
                  
                    </div>
                    <div>
                    <span className=" text-[#388E3C]  text-xs lg:text-sm">
                        ({discountedPrice}% Off)
                      </span>
                    </div>
                  </div>
                
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
