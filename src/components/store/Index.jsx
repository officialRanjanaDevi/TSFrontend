"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import Banner from "./Banner";
import VisitStoreCard from "./visitStoresCard_StoresOffersPage";
import StoreOverview1 from "./StoreOverview1";
import StoreOverview from "./StoreOverview";
import StoreReview from "./StoreReview";
import StoreReview1 from "./StoreReview1";
import StoreOffers from "./StoreOffers";
import axios from "axios";
import StoreReviewComp from "./StoreReviewComp";
import { UserContext } from "@/lib/UserContext";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  TwitterIcon,
  WhatsappIcon,
} from "react-share";
import Loading from "../common/Loading";

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

const StorePage = ({ storeId }) => {
  const [storeData, setStoreData] = useState(null);
  const [storeReviews, setStoreReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("overview");
  const [isFollowing, setIsFollowing] = useState(false);
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [shareClick, setShareClick] = useState(false);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const [showPopup, setShowPopup] = useState(false);
  const onShare = () => {
    setShareClick(!shareClick);
  };

  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const storeId1 = storeId;

  function handleActiveTab(value) {
    setActiveTab(value);
  }

  useEffect(() => {
    if (!storeId) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`${serverURL}/api/v1/stores/${storeId}`, {
          method: "GET",
        });
        const res = await response.json();
        setStoreData(res);

        if (res.followers && Array.isArray(res.followers.followers)) {
          const currentUserData = res.followers.followers.find(
            (follower) => follower._id === authenticated.user._id
          );
          if (currentUserData) {
            setIsFollowing(true);
          } else {
            setIsFollowing(false);
          }
        } else {
          console.error("Followers data is not an array:", res.followers);
        }
      } catch (error) {
        console.error(error);
      }
    };

    if (storeId) {
      fetchData();
    }
  }, [serverURL, storeId, authenticated.user._id]);
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        if (storeId) {
          const response = await axios.get(
            `${serverURL}/api/v1/storeReviews/${storeId}`
          );
          setStoreReviews(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchReviews();
  }, [serverURL, storeId, storeReviews.length]);

  const handleFollow = async () => {
    if (!authenticated.user || !authenticated.user._id) {
      setShowPopup(true);
      return;
    }
    try {
      const apiUrl = `${serverURL}/api/v1/${storeId1}/follow`;
      const removeFollowerUrl = `${serverURL}/api/v1/${storeId1}/unfollow`;

      const requestConfig = {
        headers: {
          Authorization: `Bearer ${authenticated.token}`,
        },
      };

      // If the user is not following, add the follower
      if (!isFollowing) {
        const res = await axios.post(apiUrl, {}, requestConfig);
        setStoreData(res?.data?.data);
        setIsFollowing(true);
      } else {
        // If the user is already following, remove the follower
        const res = await axios.post(removeFollowerUrl, {}, requestConfig);
        setStoreData(res?.data?.data);
        setIsFollowing(false);
      }
    } catch (error) {
      console.error("Error toggling follower status:", error);
    }
  };

  
  return storeData ? (
    <div className="w-full ">
      {showPopup && ( // Render the popup if showPopup is true
        <Popup
          message="User not logged in. Please log in to follow stores."
          onClose={() => setShowPopup(false)} // Close the popup when the close button is clicked
        />
      )}
      <Banner storeData={storeData} />
      <div className="flex flex-col w-full px-5 lg:px-[80px] pt-[40px] pb-[20px] items-start gap-4 lg:gap-8 relative">
        <div className="flex flex-col items-start justify-between w-full lg:flex-row">
          <div className=" flex flex-col items-start w-full gap-4 lg:w-3/4">
            <section className="flex  w-full   sm:flex-row sm:justify-evenly sm:py-2 ">
              <div className="flex   w-full">
                {isFollowing ? (
                  <span
                    className="bg-gray-600 m-2 text-white font-fontMedium text-xs w-[6rem] flex cursor-pointer justify-center items-center sm:h-7"
                    onClick={handleFollow}
                  >
                    <p className="text-xs">Unfollow</p>
                  </span>
                ) : (
                  <span
                    className="bg-gray-800 m-2   text-white font-fontMedium text-xs w-[9rem] flex cursor-pointer justify-center items-center sm:h-7"
                    onClick={handleFollow}
                  >
                    Follow
                  </span>
                )}

                <span
                  className="bg-white m-2 border border-gray-400 cursor-pointer text-gray-600 font-fontMedium text-xs w-[11rem] flex justify-center items-center h-7"
                  onClick={() => handleActiveTab("reviews")}
                >
                  <span className="pb-1 pr-1 text-lg font-fontMedium">
                    <Image
                      width={10}
                      height={10}
                      src="/icons/StoreReviewPageTop3.png"
                      alt="writeAReview"
                      className="pt-1"
                    />
                  </span>
                  <div
                    onClick={() => {
                      setReviewBoxOpen(!reviewBoxOpen);
                    }}
                  >
                    Write a Review
                  </div>
                </span>
                <div
                  className="bg-white m-2 border border-gray-400 cursor-pointer text-gray-600 font-fontMedium text-xs w-[8rem] flex flex-wrap justify-center items-center h-7"
                  onClick={onShare}
                >
                  <span className="pb-1 pr-1 text-lg font-fontMedium">
                    <Image
                      width={10}
                      height={10}
                      src="/icons/StoreReviewPageTop4.png"
                      alt="writeAReiview"
                      className="pt-1"
                    />
                  </span>
                  <span>Share</span>
                </div>

                {shareClick && (
                  <div className="z-50 xxs:flex-wrap sm:ml-60 ml-20 py-2 px-1 rounded-xl mt-11 absolute flex flex-row border-2 border-[#ffa726] bg-white">
                    <div className="mx-1">
                      <FacebookShareButton url={shareUrl}>
                        <FacebookIcon size={32} className="rounded-lg" />
                      </FacebookShareButton>
                    </div>
                    <div className="mx-1">
                      <WhatsappShareButton url={shareUrl}>
                        <WhatsappIcon size={32} className="rounded-lg" />
                      </WhatsappShareButton>
                    </div>
                    <div className="mx-1">
                      <LinkedinShareButton url={shareUrl}>
                        <LinkedinIcon size={32} className="rounded-lg" />
                      </LinkedinShareButton>
                    </div>
                    <div className="mx-1">
                      <TelegramShareButton url={shareUrl}>
                        <TelegramIcon size={32} className="rounded-lg" />
                      </TelegramShareButton>
                    </div>
                    <div className="mx-1">
                      <TwitterShareButton url={shareUrl}>
                        <TwitterIcon size={32} className="rounded-lg" />
                      </TwitterShareButton>
                    </div>
                    <div
                      className="mx-1 text-2xl cursor-pointer"
                      onClick={handleCopyLink}
                    >
                      🧷
                    </div>
                  </div>
                )}
              </div>
            </section>
            <section className="flex justify-around w-full text-center sm:w-full">
              <span
                className={`sm:px-5 px-3 py-2 font-fontMedium w-full cursor-pointer ${
                  activeTab === "overview"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 border-b"
                }`}
                onClick={() => handleActiveTab("overview")}
              >
                Overview
              </span>
              <span
                className={` sm:px-5 px-3 py-2 font-fontMedium w-full cursor-pointer ${
                  activeTab === "reviews"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 border-b"
                }`}
                onClick={() => handleActiveTab("reviews")}
              >
                Reviews
              </span>
              <span
                className={` sm:px-5 px-3 py-2 font-fontMedium w-full cursor-pointer ${
                  activeTab === "offers"
                    ? "border-b-2 border-black text-black"
                    : "text-gray-400 border-b"
                }`}
                onClick={() => handleActiveTab("offers")}
              >
                Offers
              </span>
            </section>
            {activeTab === "overview" && (
              <StoreOverview1 storeData={storeData} />
            )}
            {activeTab === "reviews" && (
              <StoreReview1 storeData={storeData} storeReviews={storeReviews} />
            )}
            {activeTab === "offers" && <StoreOffers storeId={storeId} />}
          </div>
          <div className="   lg:w-[45vh]">
            <VisitStoreCard storeId={storeId} />
          </div>
        </div>
        {reviewBoxOpen && (
          <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="relative lg:w-4/5 xl:w-[600px] 2xl:w-[600px]">
              <StoreReviewComp
                storeId={storeId}
                setReviewBoxOpen={setReviewBoxOpen}
                setStoreReviews={setStoreReviews}
                storeReviews={storeReviews}
              />
            </div>
          </div>
        )}
        <div className="flex w-full">
          {activeTab === "overview" && <StoreOverview storeData={storeData} />}
          {activeTab === "reviews" && (
            <StoreReview storeReviews={storeReviews} />
          )}
        </div>
      </div>
    </div>
  ) : (
    <Loading />
  );
};

export default StorePage;
