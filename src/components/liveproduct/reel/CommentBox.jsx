import React, { useState, useContext } from "react";
import Image from "next/image";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
function CommentBox({ setComment, data, reelID, reel,setCommentCount }) {
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const sellerServerURL = process.env.NEXT_PUBLIC_BASE_API_URL_SELLER;
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [comments, setComments] = useState(data);
  const [com, setCom] = useState("");
  const [loading, setLoading] = useState(false);
  const crosshandler = () => {
    setComment(false);
  };

  const postComment = async () => {
    if (!com) {
      return;
    }
    try {
      setLoading(true);
      let response;
      if (reel?.type === "store") {
        response = await axios.post(
          `${sellerServerURL}/reels/comment/${reel._id}/${authenticated.user._id}`,
          { comment: com, reel: reelID }
        );
        setComments(response.data.data[0].comments);
        setCommentCount(response.data.data[0].comments.length)
        setCom("");
        setLoading(false);
      } else {
        response = await axios.post(
          `${serverURL}/reels/comment/${reel._id}/${authenticated.user._id}`,
          { comment: com, reel: reelID }
        );
        setComments(response.data.data[0].comments);
        setCommentCount(response.data.data[0].comments.length)
        setCom("");
        setLoading(false);
      }
    } catch (e) {
      setLoading(false);
      console.log(e);
    }
  };
  return (
    <>
      {/* <div className='flex items-center justify-center w-screen bg-pink-200 '> */}
      <div className="fixed top-10 flex items-center justify-center left-0 right-0 z-50 p-4   overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(80%-1rem)] max-h-full">
        <div className="relative w-[90vw] md:w-[500px] max-h-full">
          <div className="bg-white">
            <div>
              <div className="flex justify-between p-5 border-2 border-gray-200 ">
                <div> Comment {comments.length}</div>
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
                  {comments.length > 0 &&
                    comments.map((comment, index) => (
                      <div className="flex items-center gap-3 w-full py-6" key={index}>
                        <img
                         className="h-12 w-12 rounded-full"
                          src={comment?.user?.profilePic?.url || "/images/prof2.svg"}
                          alt=""
                        />
                        <p className="flex flex-col">
                          {comment?.user?.name}
                          <span className="text-gray-600 ">
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
                    className={`text-white py-2 rounded bg-amber-500 w-1/5 duration-300 ${loading
                        ? "opacity-50 cursor-not-allowed"
                        : "hover:scale-105"
                      }`}
                    onClick={postComment}
                    disabled={loading}
                  >
                    {loading ? "Uploading..." : "Upload"}
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
