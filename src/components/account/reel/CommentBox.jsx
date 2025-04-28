import React, { useState, useContext } from "react";
import Image from "next/image";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { AiOutlineDown } from "react-icons/ai";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
function CommentBox({ setComment, data, reelID ,reel}) {
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const sellerServerURL=process.env.NEXT_PUBLIC_BASE_API_URL_SELLER;
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [comments, setComments] = useState(data);
  const [com, setCom] = useState("");
  const [reply, setReply] = useState(null);
  const [reply2, setReply2] = useState("");
  const replayHandler = () => {
    setReply(!reply);
  };
  const crosshandler = () => {
    setComment(false);
  };
  const sendHandler = () => {
    alert(reply2);
    setReply2("");
  };
  const addHandler = () => {};
  const postComment = async () => {
    if (!com) {
      return;
    }
    try {
      let response;
      if(reel?.type==="store"){
         response = await axios.post(
          `${sellerServerURL}/reels/comment/${reel._id}/${authenticated.user._id}`,
          { comment: com, reel: reelID }
        );
        setComments(response.data.data.comments);
        setCom("");
      }else{
         response = await axios.post(
          `${serverURL}/reels/comment/${reel._id}/${authenticated.user._id}`,
          { comment: com, reel: reelID }
        );
        setComments(response.data.data.comments);
        setCom("");
      }
    
   
    } catch (e) {
      console.log(e);
    }
  };
  console.log("here it is",data)
  return (
    <>
      {/* <div className='flex items-center justify-center w-screen bg-pink-200 '> */}
      <div className="fixed top-0 flex items-center justify-center left-0 right-0 z-50 p-4   overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
        <div className="relative w-full max-w-2xl max-h-full">
          <div className="bg-white">
            <div>
              <div className="flex justify-between p-5 border-2 border-gray-200 ">
                <div> Comment {comments.length }</div>
                {/* <img width={500} height={500} src="/images/cross.svg" alt=".." onClick={() => {
                                    crosshandler()
                                }} /> */}
                <Image
                  width={20}
                  height={20}
                  src="/images/cross.svg"
                  alt=".."
                  onClick={() => {
                    crosshandler();
                  }}
                />
              </div>

              <div className="border-2 border-gray-200  p-7">
                <div className=" flex flex-col divide-y-2">
                  {comments.length>0 &&
                    comments.map((comment, index) => (
                      <div className="flex items-center gap-3  py-6" key={index}>
                        <Image
                          width={47}
                          height={47}
                          src={comment?.user?.profilePic?.url||"/images/prof2.svg"}
                          alt=""
                          className="rounded-full"
                        />
                        <p>
                        {comment?.user?.name}
                          <span className="text-gray-600 ml-2">
                            {comment.comment}
                          </span>
                        </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="border-2 border-gray-200  p-7">
                <div className=" flex gap-4">
                  <input
                    type="text"
                    name="com"
                    value={com}
                    placeholder="post comment"
                    onChange={(e) => setCom(e.target.value)}
                    id=""
                    className="border-2 py-2 rounded w-4/5 px-4"
                  />
                  <button
                    className="text-white hover:scale-105 duration-300 py-2 rounded bg-amber-500 w-1/5 "
                    onClick={postComment}
                  >
                    Upload
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CommentBox;
