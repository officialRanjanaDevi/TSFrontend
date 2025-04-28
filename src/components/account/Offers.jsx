"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import { formatDistanceToNow } from "date-fns";

const Offers = () => {
  const [notifications, setNotifications] = useState([]);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const userId = authenticated.user._id;
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [offers,setOffers]=useState([])
  // console.log("userid: ", userId);
  useEffect(() => {
    // Make an API request to fetch notifications data using Axios
    axios
      .get(`${serverURL}/api/v1/offer/getAllOffers`)
      .then((response) => {
        if (response.data) {
          console.log(response.data)
          setOffers(response.data)
        }
      })
      .catch((error) => {
        console.error("Error fetching notifications:", error);
      });
  }, [serverURL, userId]);
  // console.log("notifications: ", notifications);
  const formatDate = (dateString) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date string");
      }

      const distance = formatDistanceToNow(date, { addSuffix: true });
      let formattedDistance = distance.replace(/^about\s/i, "");
      formattedDistance += "\n";
      return formattedDistance;
    } catch (error) {
      console.error("Error formatting date:", error.message);
      return "Invalid date";
    }
  };

  return (
    <>
      <div className="m-4 text-[18px] font-semibold">
        All Notifications({notifications.length})
      </div>
      <div className="flex flex-row px-5 m-3">
        <Link href={"/account/notifications"}>
          <span className="px-5 underline hover:text-[#F19305]">All</span>
        </Link>
        <Link href={"/account/notifications/offers"}>
          <span className="underline text-[#F19305]">Offers</span>
        </Link>
      </div>
      <div>
        {offers.map((offer) => (
          <Link
          href={`/products/details?productId=${offer?.applicableProducts[0]?._id}`}
            key={offer?._id}
          >

            <div className="m-2 w-full overflow-hidden shadow-md border-[2px]" >
              <div className="flex flex-row">
                <div className="w-full flex flex-col justify-between bg-[#F1F1F180] lg:py-2 px-4 md:bg-white">
                    <div>
                  <h2 className="text-[14px] font-semibold pt-1">
                    {offer?.title}
                  </h2>
                  <div className="flex flex-row">
                    <span className="text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
                      {offer?.description}
                    </span>
                  </div>
                  <div className="text-[#7C7C7C] text-[12px] py-1">
                  upto {offer?.discount}% OFF
                  </div></div>
                  <div className="text-[#7C7C7C] text-[12px] py-1">
                    expired {formatDate(offer?.validUntil)}
                  </div>
                </div>
                <div className="py-2 px-4 overflow-hidden rounded-lg ">
                    <img
                    
                      alt="Notification Image"
                      className=" mx-1 md:h-[20vh] md:w-[18vw] h-[20vh] w-[50vw] rounded-md "
                      src={offer?.applicableProducts[0]?.Images[0]?.url}
                    />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Offers;
