import { UserContext } from "@/lib/UserContext";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiFillLike,
  AiFillDislike,
} from "react-icons/ai";
import Image from "next/image";
import { BiCommentDetail } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { useState, useEffect, useRef, useContext } from "react";
import { BsFillVolumeMuteFill } from "react-icons/bs";
import { VscUnmute } from "react-icons/vsc";
import { BsPlay } from "react-icons/bs";
import { AiOutlinePause } from "react-icons/ai";
import { Spin } from "antd";
import Share from "@/components/common/Share";
import Link from "next/link";
import axios from "axios";
import toast from "react-hot-toast";
import CommentBox from "./reel/CommentBox";
// import Upload from './UploadPhoto';

function LiveProduct({ liveProductData, share, setShare, src }) {
  console.log(liveProductData)
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [like, setLike] = useState(false);
  const [likeCount, setLikeCount] = useState(liveProductData.likes.length);
  const [dislike, setDislike] = useState(false);
  const [dislikeCount, setDislikeCount] = useState(liveProductData.dislikes.length);
  const [shareCount, setShareCount] = useState(liveProductData.shares);
  const [play, setPlay] = useState(false);
  const [mute, setMute] = useState(false);
  const videoRef = useRef(null);
  const [follow, setFollow] = useState(false);
  const [follow2, setFollow2] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [description, setDescription] = useState(false);
  const [data, setData] = useState(liveProductData);
   const [comment,setComment]=useState(false);
   const [commentCount,setCommentCount]=useState(liveProductData.comments.length);
   const alreadyLiked = liveProductData?.likes?.some(
    (like) => like.userId === authenticated?.user?._id
  );
    useEffect(() => {
         const isFollowing = liveProductData?.store[0]?.followers?.followers.some(
        (follower) => follower === authenticated.user._id
      );
        setFollow(isFollowing);
  
    }, []);

  const alreadyDisLiked = liveProductData?.dislikes?.some(
    (dislike) => dislike.userId === authenticated?.user?._id
  );
  
  const serverurl = process.env.NEXT_PUBLIC_BASE_API_URL;
  useEffect(() => {
    const videoElement = videoRef.current;
    const handlePause = () => {
      setPlay(false);
    };

    if (videoElement) {
      videoElement.addEventListener("pause", handlePause);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("pause", handlePause);
      }
    };
  }, []);

  const handlePlay = () => {
    if (videoRef.current) {
      const videos = document.getElementsByTagName("video");
      for (let i = 0; i < videos.length; i++) {
        if (videos[i] !== videoRef.current) {
          videos[i].pause();
        }
      }
      setPlay(true);
      videoRef.current.play();
    }
  };
  const followHandler = async () => {
    if(!authenticated.user._id){
       toast.error("Please login")
    }
    try {
      setFollow2(true);
        const url = `${serverurl}/api/v1/${data.storeId._id}/${follow ? "unfollow" : "follow"}`;
    
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

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };
  const handleDescription = () => {
    setDescription(!description);
  };

  const handleLike = async () => {
    try {
      if (!like) {
        setLike(true);
        setLikeCount(likeCount + 1);

        if (dislike) {
          setDislike(false);
          setDislikeCount(dislikeCount - 1);
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/reels/like/${data._id}/${authenticated.user._id}`,
        );
      } else {
        setLike(false);
        setLikeCount(likeCount - 1);

        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/reels/like/${data._id}/${authenticated.user._id}`,
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDislike = async () => {
    try {
      if (!dislike) {
        setDislike(true);
        setDislikeCount(dislikeCount + 1);

        if (like) {
          setLike(false);
          setLikeCount(likeCount - 1);
        }

        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/reels/dislike/${data._id}`,
          { dislike: true }
        );
      } else {
        setDislike(false);
        setDislikeCount(dislikeCount - 1);

        await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/reels/dislike/${data._id}`,
          { dislike: false }
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleShare = async () => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/reels/share/${data._id}?share=${share}`
      );
    } catch (e) {
      console.log(e);
    }
  };

  console.log(follow)
  return (
    <>
      <div className="flex flex-row justify-center w-full ">
        <div className="w-60 lg:w-80 relative h-fit items-center bg-gray-200 flex my-12  ">
          <div className="w-60 lg:w-80">
            <video
              width={"320"}
              src={src}
              ref={videoRef}
              className="w-60 lg:w-80 rounded shadow-md shadow-black"
            />
                <div className="absolute   flex flex-col  items-center justify-end gap-1 pb-2   bottom-0 -right-12 sm:gap-3">
              <div className="flex flex-col gap-1 ">
                {like|| alreadyLiked ? (
                  <div className=" flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                    <AiFillLike
                      className=" w-12 text-2xl text-blue-500"
                      onClick={() => {
                        handleLike();
                      }}
                    />
                  </div>
                ) : (
                  <div className=" flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                    <AiOutlineLike
                      className="w-12 text-2xl "
                      onClick={() => {
                        handleLike();
                        if (dislike) {
                          handleDislike();
                        }
                      }}
                    />
                  </div>
                )}
                <p className="text-center text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
                  {likeCount || 0}
                </p>
              </div>
              <div className="flex flex-col gap-1 ">
                {dislike||alreadyDisLiked ? (
                  <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                    {" "}
                    <AiFillDislike
                      className="w-12 text-2xl text-blue-500"
                      onClick={() => {
                        handleDislike();
                      }}
                    />
                  </div>
                ) : (
                  <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                    {" "}
                    <AiOutlineDislike
                      className="w-12 text-2xl"
                      onClick={() => {
                        handleDislike();
                        if (like) {
                          handleLike();
                        }
                      }}
                    />
                  </div>
                )}
                <p className="text-center text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
                  {dislikeCount || 0}
                </p>
              </div>
              <div
                className="flex flex-col items-center gap-1"
                onClick={() => {
                  setComment(true);
                }}
              >
                <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                  <BiCommentDetail className="w-12 text-2xl" />
                </div>
                <p className="text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
                  {commentCount}
                </p>
              </div>
              <div
                className="flex flex-col gap-1 "
                onClick={() => {
                  setShare(true);
                  setShareCount(shareCount + 1);
                  handleShare();
                }}
              >
                <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                  <FaShare className="w-12 text-2xl" />
                </div>
                <p className="text-xs font-bold text-white sm:font-normal text-center sm:inline sm:text-black ">
                  Share
                </p>
              </div>
              {share && <Share share={share} setShare={setShare} url={src} />}
              <div
                className="flex flex-col gap-1 cursor-pointer"
              >
                <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400 ">
                  <SlOptions className="w-12 text-2xl " />
                </div>
              </div>
           
            </div>
          </div>

          <div className="flex mt-2 ">
            {/* Replace your BsPlay component with this */}
            {play ? (
              <AiOutlinePause
                className="absolute text-3xl text-white  top-60 left-32"
                onClick={() => {
                  setPlay(false);
                  videoRef.current.pause();
                }}
              />
            ) : (
              <BsPlay
                className="absolute  text-3xl text-white  top-60 left-32"
                onClick={handlePlay}
              />
            )}

            {mute ? (
              <BsFillVolumeMuteFill
                className="absolute top-2 right-1 text-4xl text-white"
                onClick={() => {
                  setMute(false);
                  videoRef.current.muted = false;
                }}
              />
            ) : (
              <VscUnmute
                className="absolute text-2xl text-white h-9 top-2 right-1 "
                onClick={() => {
                  setMute(true);
                  videoRef.current.muted = true;
                }}
              />
            )}
          </div>
          <Link href={`nearByStore/store?storeId=${data?.store[0]?._id}`}>
            <button className="absolute w-[120px]  bottom-16 text-xs right-4 bg-[#EB8105] px-2 py-[0.4rem] hover:scale-105 duration-300">
              Shop now
            </button>
          </Link>
          <div>
            <div
              className=" hover:scale-105 duration-300 text-xs text-white py-[0.4rem] w-[120px] flex items-center gap-1  
              absolute  bottom-8 right-4 bg-[#333333] px-1"
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
              {follow?
                <button className="inline w-full">Following</button>:
                <button className="inline w-full">Follow store</button>

              }
            </div>
          </div>
          <div className="flex absolute  left-2 bottom-10 items-center">
            <Image
              width={30}
              height={35}
              src={data?.store[0]?.images[0]?.url || "/images/prof.jpeg"}
              alt=".."
              className=" h-12 w-12 rounded-full "
            />
            <div>
              <p className="w-32 ml-3  overflow-hidden text-xs text-white  bottom-12 left-8">
                {data?.store[0]?.storeName || "store name"}
              </p>
              <p className="w-32 ml-3  overflow-hidden text-xs text-white  bottom-12 left-8">
                {data?.caption || "store name"}
              </p>
            </div>
          </div>
        </div>
          {comment && (
                <CommentBox comment={comment} setComment={setComment} data={data.comments} reelID={data._id} reel={data} setCommentCount={setCommentCount}/>
              )}
      </div>
    </>
  );
}

export default LiveProduct;
