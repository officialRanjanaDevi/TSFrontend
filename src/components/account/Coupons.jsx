"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Image from "next/image";

const WishlistItemLoader = () => (
  <>
    <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
      <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
        <div className="flex flex-row">
          <div className="w-20 h-24 bg-gray-300 rounded"></div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
      <span className="flex justify-end">
        <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
      </span>
    </div>
    <div className="my-4"></div>
    <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
      <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
        <div className="flex flex-row">
          <div className="w-20 h-24 bg-gray-300 rounded"></div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
      <span className="flex justify-end">
        <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
      </span>
    </div>
  </>
);

const Coupons = () => {
  const [couponsData, setCouponsData] = useState([]);
  const [isCopied, setIsCopied] = useState(false); // State for showing the "Copied" message
  const [loading, setLoading] = useState(true);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  useEffect(() => {
    // Fetch data from your API
    axios
      .get(`${serverURL}/api/v1/coupons/getAll`)
      .then((response) => {
        setCouponsData(response.data);
        console.log(response.data)
        setLoading(false);
        // console.log("setCouponsData", response.data);
      })
      .catch((error) => {
        console.error("Error fetching coupons:", error);
        setLoading(false);
      });
  }, [serverURL]);

  const handleCopyClick = (code) => {
    // Create a temporary input element to copy the text
    const tempInput = document.createElement("input");
    tempInput.value = code;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body?.removeChild(tempInput);

    // Set isCopied to true to display the "Copied" message
    setIsCopied(true);

    // Reset isCopied after a short delay
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const [benefits, setBenefits] = useState({});

  const toggleBenefits = (couponId) => {
    setBenefits((prev) => ({
      ...prev,
      [couponId]: !prev[couponId], // Toggle only for the specific coupon
    }));
  };
  
  const Column = ({ _id, discountValue, validity, code, maxDiscount, time, minOrderValue, message, description, title }) => {
    const expiryDate = new Date(validity?.validTill).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  
    return (
      <div className="flex flex-row border-black border-[1px] m-4">
        <div className="w-2/5 xl:w-1/5 border-r-gray-400 border-[1px]">
          <div className="grid items-center text-[20px] text-[#059669] font-semibold justify-center py-4 h-2/3">
            <span>{discountValue}%</span>
            <span>OFF</span>
          </div>
          <div className="flex gap-1 items-center border-t-gray-400 border-[1px] justify-center md:text-[14px] text-[12px] h-1/3">
            Expiry: <span className="font-semibold">{expiryDate}</span>
          </div>
        </div>
  
        <div className="flex flex-col w-3/5 md:w-4/5">
          <div className="flex flex-col px-3 py-5 h-2/3">
            <p>{title}</p>
            <span className="text-[#7C7C7C]">
              On minimum purchase of <span className="text-[#18181B]">Rs.{minOrderValue}</span>
            </span>
            <p className="flex flex-row">
              <span>Code: <span className="px-1 font-semibold text-[12px] md:text-[14px]">{code}</span></span>
              <span className="px-1" onClick={() => handleCopyClick(code)}>
                <Image width={20} height={20} src="/images/Vector8.svg" alt="Copy" className="w-[14.5px] md:w-[24px] md:mt-0 mt-1" style={{ cursor: "pointer" }} />
              </span>
            </p>
          </div>
  
          <div className="flex flex-row px-3 justify-between pt-3 sm:pt-2 border-t-gray-400 border-[1px] py-1 h-1/3">
            <span className="justify-start">{time}</span>
            <div className="text-xs">
              {benefits[_id] && (
                <>
                  <p className="flex items-center gap-1"><span className="h-1 w-1 bg-[#EB8105] rounded-full"></span>{description}</p>
                  <p className="flex items-center gap-1"><span className="h-1 w-1 bg-[#EB8105] rounded-full"></span>{message}</p>
                  <p className="flex items-center gap-1"><span className="h-1 w-1 bg-[#EB8105] rounded-full"></span>Get discount up to {maxDiscount} Rs.</p>
                </>
              )}
            </div>
            <button className="ml-auto text-[#EB8105] text-[14px] font-semibold" onClick={() => toggleBenefits(_id)}>
              {benefits[_id] ? "Hide Benefits" : "See Benefits"}
            </button>
          </div>
        </div>
      </div>
    );
  };
  


  return (
    <>
      {/* Conditional rendering of loader when loading state is true */}
      {loading && <WishlistItemLoader />}

      {/* Display coupons data when loading is false */}
      {!loading && (
        <>
          {/* Display "Copied" message if isCopied state is true */}
          {isCopied && <div className="text-green-500">Copied!</div>}
          {/* Map through couponsData and render Column component for each coupon */}
          {couponsData.map((couponItem, index) => (
            <Column key={index} {...couponItem} />
          ))}
        </>
      )}
    </>
  );
};

export default Coupons;
