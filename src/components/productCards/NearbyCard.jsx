"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import { useRouter } from "next/navigation";

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

export default function NearbyCard({
  _id,
  like,
  count,
  store,
  shop,
  logo,
  discount,
  text,
  location,
  distance,
  isFollowed,
}) {
  const [image, setImage] = useState("/images/Vector3.svg");
  const [favourite, setFavourite] = useState(false);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const router = useRouter();
  const [error, setError] = useState(null);
  const [follow, setFollow] = useState(isFollowed);
  const [showPopup, setShowPopup] = useState(false);
  const img_fashion = "/images/img_fashion.jpeg";

  useEffect(() => {
    // Check if the current user is following the store
    const isFollowing =
      store.followers &&
      store.followers.followers.includes(authenticated.user._id); // Assuming user._id is the user ID
    setFollow(isFollowing);
  }, [store.followers, authenticated.user._id]);

  const handleFollow = async () => {
    if (!authenticated.user || !authenticated.user._id) {
      // If not logged in, show the popup
      setShowPopup(true);
      return; // Prevent further execution
    }
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/${store._id}/${
          follow ? "unfollow" : "follow"
        }`,
        {},
        {
          headers: {
            Authorization: `Bearer ${authenticated.token}`,
          },
        }
      );

      console.log(response.data);
      console.log(
        `${follow ? "Unfollowed" : "Followed"} store with ID ${store._id}:`,
        response.data
      );
      // Update the follow state
      setFollow(!follow);
    } catch (error) {
      console.error(
        `Error ${follow ? "unfollowing" : "following"} store:`,
        error
      );

      // Handle errors if needed
    }
  };

  return (
    <div className="w-full  shadow-sm rounded hover:shadow-md md:pb-2 ml-1 -ml-1">
      {showPopup && ( // Render the popup if showPopup is true
        <Popup
          message="User not logged in. Please log in to follow store."
          onClose={() => setShowPopup(false)} // Close the popup when the close button is clicked
        />
      )}
      <div>
        {store.images && store.images.length > 0 && (
          <div className="relative w-full">
            <Link href={`/nearByStore/store?storeId=${store._id}`} passHref>
              <img
                key={0}
                width={200}
                height={250}
              
                src={
                  store?.images[0]?.url?.includes("imgur")? img_fashion
                    : store?.images[0]?.url
                }
                alt={`Image 1`}
                className="block  w-full h-[230px] lg:h-[300px] rounded  object-cover"
              />
            </Link>
            <div className="absolute text-black py-1 px-2 bg-white rounded-[16px] left-2 bottom-2">
              <h2 className="flex flex-row text-xs font-semibold">
                <div>{like}</div>
                <Image
                  width={15}
                  height={15}
                  alt="heart"
                  src="/images/Vector2.svg"
                />
                <span className="mx-1 text-gray-400">|</span>
                {count}
              </h2>
            </div>
            <div
              className="absolute xxs:right-1 xxs:top-1 text-black right-2 md:top-2 top-6"
              onClick={handleFollow}
            >
              <button className="bg-white px-2 py-1 rounded-sm ">
                <p className="text-xs">{follow ? "Unfollow.." : "+ Follow"}</p>
              </button>
            </div>
          </div>
        )}

        <div className="px-1 mt-2 md:px-2">
          <h3 className="font-serif md:text-[20px] mb-1 truncate">{shop}</h3>
          <div className="flex flex-row items-center">
            <Image
              width={20}
              height={20}
              alt="ecommerce"
              className="w-3 h-3 md:w-5 md:h-5"
              src={`/images/${logo}`}
            />
            <span className="px-1 text-sm">{discount}</span>
            <span
              className={`ml-1 text-[12px] md:text-base ${
                text === "active" ? "text-red-500" : "text-green-500"
              }`}
            >
              ∙ {text === "active" ? "Closed" : "Open"}
            </span>
          </div>
          <div className="flex flex-row">
            <span>{location}</span>
            <span className="ml-1">{distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
