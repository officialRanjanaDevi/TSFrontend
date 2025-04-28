"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Link from "next/link";
import { UserContext } from "@/lib/UserContext";
import axios from "axios";
import { Popup } from "../productCards/ProductCard";

const SimilarProductCard = ({ productDetails }) => {
  const [showPopup, setShowPopup] = useState(false);
  const {
    _id,
    productName,
    productImage,
    description,
    rating,
    price,
    images,
   
    Size = {},
  } = productDetails;
  const [favourite, setFavourite] = useState(false);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const [selectedSize, setSelectedSize] = useState();
  const sizePrice = Size[selectedSize]?.trialshopyPrice || "N/A";
  const sizeMRP = Size[selectedSize]?.MRP || "N/A";
  const discount=Math.floor((sizeMRP-sizePrice)/sizeMRP*100);
  useEffect(() => {
    // Check if Size is not undefined or null
    const sizeKeys = Object.keys(Size || {});
    if (sizeKeys.length > 0) {
      setSelectedSize(sizeKeys[0]);
    }
  }, [Size]);

  useEffect(() => {
    setFavourite(
      authenticated.user.wishList && authenticated.user.wishList.includes(_id)
    );
  }, [authenticated.user.wishList, _id]);

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
          const updata = res.data;
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
          const updata = res.data;
          setAuthenticated({
            ...authenticated,
            user: { ...authenticated.user, wishList: res.data.wishList },
          });
        })
        .catch((err) => console.error(err));
    }
  };

  const checkUserWishlist = (id) => {
    const wishList = authenticated.user.wishList;
    wishList.forEach((wish) => {
      if (wish == id) {
        return true;
      }
    });

    return false;
  };
  // console.log(productDetails,"here")
  return (
    <>
      {showPopup && (
        <Popup
          message="User not logged in. Please log in to add to wishlist."
          onClose={() => setShowPopup(false)}
        />
      )}
      <div className="p-2 flex flex-col gap-2 items-center border shadow-lg rounded max-h-min w-[300px] ">
        <div className="h-[200px] lg:h-48  relative w-[270px] m-auto">
          <div className="px-1 lg:px-2 py-0.5 lg:py-1 flex flex-row items-center gap-2 cursor-pointer text-[10px] lg:text-xs absolute bottom-1 left-1  lg:bottom-2 lg:left-2 bg-white border rounded-sm">
            <p className="p-0.5 bg-gray-600 text-white rounded-sm">
              {rating?.rating ? `⭐${rating.rating}` : "No Rating"}
            </p>
            <p className="p-1">
              {rating?.count ? `${rating.count} Ratings` : "No Ratings"}
            </p>
          </div>
          <div className="absolute inset-0">
            {productImage && (
              <img
                className="w-full h-full "
                src={productImage || "https://picsum.photos/200/300"}
                width={300}
                height={300}
                alt={productName}
              />
            )}
          </div>
          <div className="absolute top-2 right-2">
            <button>
              <Image
                width={25}
                height={25}
                alt="heart"
                className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
                src={favourite ? "/images/heart.svg" : "/images/Vector3.svg"}
                onClick={handleFavouriteClick}
              />
            </button>
          </div>
        </div>

        <div className="flex w-[270px] items-start">
          <p className="font-semibold text-[12px] md:text-[14px] hover:underline whitespace-nowrap overflow-hidden">
            {productName}
          </p>
        </div>

        <div className="flex flex-col w-[270px] p-0">
          <div className="flex flex-row items-center gap-2 text-xs">
          <div className="flex justify-between w-full items-center">
          <div className="w-fit  flex justify-between lg:inline lg:border-box p-2 lg:p-1 border border-gray-400 bg-gray-50 rounded-sm">
              <span className="mr-2 font-bold">₹{sizePrice}</span>
              <span className="text-red-500 line-through ">₹{sizeMRP}</span>
            </div>
            <p className="text-green-600 text-[0.8rem]">{discount}% OFF </p> 
              </div>
          

            <p className="hidden lg:inline-block">{description}</p>
          </div>

          <ul className="text-xs hidden lg:block">
            <li className="flex items-center gap-1 w-60">
              <div className="">
                <Image
                  src="/images/listmarker.svg"
                  width={10}
                  height={10}
                  alt="SVG List Marker"
                />
              </div>
              <span>get upto {discount+5}% off using coupons</span>
            </li>
            <li className="flex items-center gap-1 w-60">
              <div className="">
                <Image
                  src="/images/listmarker.svg"
                  width={10}
                  height={10}
                  alt="SVG List Marker"
                />
              </div>
              <span> Free Delivery</span>
            </li>
          </ul>
        </div>

        <Link href={`/products/details?productId=${productDetails._id}`}>
          <button className="flex items-center justify-center gap-2 w-[270px]  py-1 lg:py-2 px-4 lg:px-6  border border-gray-400 bg-gray-50 rounded-sm hover:bg-black hover:text-white">
            <p className="font-semibold">View Details</p>
          </button>
        </Link>

        <div className="flex flex-col  items-start lg:flex-row lg:items-center justify-between text-xs w-[270px] ">
          <div className="flex flex-row items-center gap-1">
            <span className="text-green-600 font-bold">Open</span>
            <p className="font-light">until 10:30</p>
          </div>

          <div className="flex flex-row gap-1 items-center">
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
    </>
  );
};

export default SimilarProductCard;
