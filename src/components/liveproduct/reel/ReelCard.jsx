
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
  import { useState, useEffect, useRef,useContext } from "react";
  import { BsFillVolumeMuteFill } from "react-icons/bs";
  import { VscUnmute } from "react-icons/vsc";
  import { BsPlay } from "react-icons/bs";
  import { AiOutlinePause } from "react-icons/ai";
  import { Spin } from "antd";
  import Share from "@/components/common/Share";
  import Link from "next/link";
  import axios from "axios";
  import { UserContext } from "@/lib/UserContext";
import CommentBox from "./CommentBox";
  // import Upload from './UploadPhoto';
  
  function ReelCard({ liveProductData, share, setShare, src }) {
    const [like, setLike] = useState(false);
    const [likeCount, setLikeCount] = useState(liveProductData.likes.length);
    const [dislike, setDislike] = useState(false);
    const [dislikeCount, setDislikeCount] = useState(liveProductData.dislikes.length);
    const [play, setPlay] = useState(false);
    const [mute, setMute] = useState(false);
    const videoRef = useRef(null);
    const [showOptions, setShowOptions] = useState(false);
    const [data,setData]=useState(liveProductData)
    const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
    const [authenticated, setAuthenticated] = useContext(UserContext);
    const [comment,setComment]=useState(false);
    console.log(liveProductData,"hjk")
    useEffect(() => {
      const videoElement = videoRef.current; // Create a variable to hold the current video element
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
 
    const toggleOptions = () => {
      setShowOptions(!showOptions);
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
    
          await axios.post(`${serverURL}/reels/like/${data._id}/${authenticated.user._id}`);
        } else {
          setLike(false);
          setLikeCount(likeCount - 1);
    
          await axios.post(`${serverURL}/reels/like/${data._id}/${authenticated.user._id}`);
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
    
          await axios.post(`${serverURL}/reels/dislike/${data._id}/${authenticated.user._id}`);
        } else {
          setDislike(false);
          setDislikeCount(dislikeCount - 1);
    
          await axios.post(`${serverURL}/reels/dislike/${data._id}/${authenticated.user._id}`);
        }
      } catch (e) {
        console.log(e);
      }
    };

  
    return (
      <>
        <div className="flex flex-row justify-center w-full ">
        <div className="w-80 relative h-fit items-center bg-gray-200 flex my-12  ">
          <div className=" w-80">
            <video width={"320"} src={src} ref={videoRef} className="w-80 rounded shadow-md shadow-black" />
            <div className="absolute -right-20 flex flex-col  items-center justify-end gap-1 pb-2 mr-5  bottom-0  sm:left-80 sm:gap-3">
               <div className="flex flex-col gap-1 ">
                  {like ? (
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
                            handleLike()
                          if (dislike) {
                            handleDislike()
                          }
                        }}
                      />
                    </div>
                  )}
                  <p className="text-center text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
                    {likeCount||0}
                  </p>
                </div>
                <div className="flex flex-col gap-1 ">
                  {dislike ? (
                    <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                      {" "}
                      <AiFillDislike
                        className="w-12 text-2xl text-blue-500"
                        onClick={() => {
                          handleDislike()
                        }}
                      />
                    </div>
                  ) : (
                    <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                      {" "}
                      <AiOutlineDislike
                        className="w-12 text-2xl"
                        onClick={() => {
                            handleDislike()
                          if (like) {
                            handleLike()
                          }
                        }}
                      />
                    </div>
                  )}
                  <p className="text-center text-xs font-bold text-white sm:font-normal sm:inline sm:text-black ">
                  {dislikeCount||0}
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
                  {data.comments.length}
                  </p>
                </div>
                <div
                  className="flex flex-col gap-1 "
                  onClick={() => {
                    setShare(true);
                   
                  }}
                >
                  <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                    <FaShare className="w-12 text-2xl" />
                 
                  </div>
                  <p className="text-xs font-bold text-white sm:font-normal text-center sm:inline sm:text-black ">
                  share
                </p>
                </div>
                {share && <Share share={share} setShare={setShare} url={src} />}
                <div
                className="flex flex-col gap-1 cursor-pointer"
                onClick={toggleOptions}
              >
                <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400 ">
                  <SlOptions className="w-12 text-2xl " />
                </div>

              </div>
              </div>
              <div className="absolute flex items-center gap-4 bottom-6 ml-2 text-white"><img src={data?.customer[0]?.profilePic?.url} alt="" className="border-2 w-12 h-12 bg-amber-500 rounded-full"/>
              <div className="text-start">
              <p>{data.customer[0].name}</p><p>{data.caption}</p>
              </div>
              </div>
            </div>
           
            <div className="flex mt-2 ">
              {/* Replace your BsPlay component with this */}
              {play ? (
  <AiOutlinePause
    className="absolute text-4xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
    onClick={() => {
      setPlay(false);
      videoRef.current.pause();
    }}
  />
) : (
  <BsPlay
    className="absolute text-4xl text-white top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
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
            {comment && (
        <CommentBox comment={comment} setComment={setComment} data={data.comments} reelID={data._id}  reel={data}/>
      )}
          </div>
        </div>
      </>
    );
  }
  
  export default ReelCard;
  