"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import { formatDistanceToNow } from "date-fns";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const userId = authenticated.user._id;
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  // console.log("userid: ", userId);
  useEffect(() => {
    // Make an API request to fetch notifications data using Axios
    axios
      .get(`${serverURL}/api/v1/notifications/getAll/${userId}`)
      .then((response) => {
        if (response.data) {
          const updatedNotifications = response.data.map((notification) => {
            return { ...notification };
          });
          setNotifications(updatedNotifications);
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
          <span className="px-5 underline text-[#F19305]">All</span>
        </Link>
        <Link href={"/account/notifications/offers"}>
          <span className="underline hover:text-[#F19305]">Offers</span>
        </Link>
      </div>
      <div>
        {notifications.map((notification) => (
          <section
            key={notification._id}
            className="m-2 hover:border-blue-700 w-full overflow-hidden shadow-md border-[2px]"
          >
            <div className="py-1">
              <div className="flex flex-row">
                <div className="w-full bg-[#F1F1F180] lg:py-2 px-4 lg:bg-white">
                  <h2 className="text-[14px] font-semibold pt-1">
                    {notification.title}
                  </h2>
                  <div className="flex flex-row">
                    <span className="text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
                      {notification.message}
                    </span>
                  </div>
                  <div className="text-[#7C7C7C] text-[12px] py-1">
                    {formatDate(notification.sendAt)}
                  </div>
                </div>
                <div className="px-2">
                  <a className="block relative rounded overflow-hidden">
                    <Image
                      height={20}
                      width={20}
                      alt="Notification Image"
                      className="p-2 mx-1 lg:h-[20vh] lg:w-[20vh] w-5/6 h-5/6 rounded"
                      src={notification.image}
                    />
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </>
  );
};

export default Notification;
