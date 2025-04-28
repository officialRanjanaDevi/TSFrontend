// Import Image from 'next/image' at the beginning of your file
import React, { useState,useEffect,useContext } from "react";
import Image from "next/image";
import { Spin } from "antd";
import {
  AiOutlineLike,
  AiFillLike,
  AiOutlineDislike,
  AiFillDislike,
} from "react-icons/ai";
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
import { UserContext } from "@/lib/UserContext";
import StoreReviewComp from "../store/StoreReviewComp";
import axios from "axios";
function ShopnowSide({store }) {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [follow, setFollow] = useState(false);
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const [follow2, setFollow2] = useState(false);
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [shareClick, setShareClick] = useState(false);
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const onShare = () => {
    setShareClick(!shareClick);
  };
  const serverurl=process.env.NEXT_PUBLIC_BASE_API_URL
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setIsCopied(true);
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy text: ", error);
      });
  };

  const followHandler = async () => {
    if(!authenticated.user._id){
       toast.error("Please login")
    }
    try {
      setFollow2(true);
        const url = `${serverurl}/api/v1/${store._id}/${follow ? "unfollow" : "follow"}`;
    
       const res=  await axios.post(
          url,
          {}, 
          {
            headers: {
              Authorization: `Bearer ${authenticated.token}`,
            },
          }
        );
        if(res){
          setFollow((prev) => !prev);
          setFollow2(false);
        }

    } catch (error) {
      setFollow2(false);
      console.error("Error updating follow status:", error);
    }
  };
 
  const likeHandler = () => {
    setLike(!like);

    if (like) {
      console.log("User unliked the content.");
    } else {
      console.log("User liked the content.");
    }
  };

  const dislikeHandler = () => {
    setDislike(!dislike);

    if (dislike) {
      console.log("User undisliked the content.");
    } else {
      console.log("User disliked the content.");
    }
  };
  useEffect(() => {
    const isFollowing =
      store.followers &&
      store.followers.followers.includes(authenticated.user._id); 
    setFollow(isFollowing);
  }, [store.followers, authenticated.user._id]);
  return (
    <>
      <div className="flex flex-col">
        <div className="w-full 2xl:flex xl:flex">
          <div className="flex mt-3 md:gap-10 sm:gap-2 lg:gap-5 xl:gap-3.5 2xl:gap-5 gap-1">
            <div className={follow ? "hidden" : "block"}>
              <div
                className="text-xs text-white p-1 w-[90px] 2xl:w-[180px] xl:w-[100px] lg:w-[145px] md:w-[220px] sm:w-[140px] h-[40px] justify-center flex items-center bottom-5 xl:left-36 bg-[#333333] rounded-md"
                onClick={followHandler}
              >
                <div className={follow2 ? "hidden" : "block "}>
                  <Image
                    src="/images/plus.svg"
                    alt=""
                    width={18}
                    height={14}
                    className="inline h-3"
                  />
                </div>
                <div className={follow2 ? "block" : "hidden "}>
                  <Spin className="inline h-3" />
                </div>
                <div className={follow2 ? "hidden" : "block "}>
                  <button className="inline w-full">Follow store</button>
                </div>
                <div className={follow2 ? "block" : "hidden "}>
                  <button className="inline w-full">Following</button>
                </div>
              </div>
            </div>

            <div
              className="flex items-center justify-center border-2 gap-1 md:gap-2 border-[#CDCDCD] text-sm w-[179px] sm:w-[190px] 2xl:w-[200px] xl:w-[130px] lg:w-[125px] md:w-[220px] h-[40px] rounded-md"
              onClick={() => {
                setReviewBoxOpen(!reviewBoxOpen);
              }}
            >
              <div className="flex items-center md:gap-1">
                <Image
                  src="/images/writeReview.jpg"
                  alt=""
                  width={20}
                  height={40}
                  className="h-full"
                />
                <button className="w-full">Write a Review</button>
              </div>
            </div>

            <div
              className=" cursor-pointer flex items-center justify-center gap-1 border-2 px-1 border-[#CDCDCD] text-sm w-[110px] sm:w-[140px] xl:w-[90px] lg:w-[90px] md:w-[180px] h-[40px] lg:mr-[-50px] rounded-md"
              onClick={onShare}
            >
              <div className="flex items-center md:gap-1">
                <Image
                  src="/images/shr.jpeg"
                  alt=""
                  width={40}
                  height={30}
                  className="flex w-4 h-3"
                />
                <button className="w-full">Share</button>
              </div>
            </div>
            {shareClick && (
              <div className="ml-60  border-2 border-[#ffa726]  z-50 xxs:flex-wrap  py-2 px-1 rounded-xl mt-11 absolute  flex flex-row  bg-white">
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

          <div className="flex gap-4 mt-3 justify-end 2xl:ml-5 xl:ml-3 md:gap-6">
            <div className="sm:ml-12 flex items-center border-2 border-[#CDCDCD] p-2 w-[172px] h-[40px] rounded-md">
              {like ? (
                <AiFillLike
                  className="w-20 h-20 text-blue-500 cursor-pointer"
                  onClick={likeHandler}
                />
              ) : (
                <AiOutlineLike
                  className="w-20 h-20 ml-1 cursor-pointer"
                  onClick={likeHandler}
                />
              )}
              <p className="flex ml-1 text-xs ">Like</p>
              <p className="h-4 ml-6 text-xs">|</p>
              {dislike ? (
                <AiFillDislike
                  className="w-20 h-20 text-blue-500 cursor-pointer"
                  onClick={dislikeHandler}
                />
              ) : (
                <AiOutlineDislike
                  className="w-20 h-20 ml-1 cursor-pointer"
                  onClick={dislikeHandler}
                />
              )}
              <p className="ml-1 text-xs">Dislike</p>
            </div>
            <div className="flex items-center justify-center cursor-pointer">
              <p className="w-[44px] h-[40px] p-2 border-2 border-[#CDCDCD] rounded-md font-bold text-xs">
                ...
              </p>
            </div>
          </div>
        </div>
        <div className="  absolute mt-20  lg:w-1/3  md:w-2/3  shadow-lg ">
          {reviewBoxOpen && (
            <StoreReviewComp
          storeId={store._id}
              setReviewBoxOpen={setReviewBoxOpen}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ShopnowSide;
