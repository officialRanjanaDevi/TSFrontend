"use client";
import React, { useContext, useState } from "react";
import axios from "axios";
import { CiHeart } from "react-icons/ci";
import { IoShareSocialOutline } from "react-icons/io5";
import { SlDislike } from "react-icons/sl";
import { LiaCommentSolid } from "react-icons/lia";
import { UserContext } from "@/lib/UserContext";
import toast from "react-hot-toast";
const AddReel = ({setOpen}) => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [loading,setLoading]=useState(false);
  const [data, setData] = useState(null);
  const [preview, setPreview] = useState(null);
  const [caption, setCaption] = useState("");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setData(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const postData = async () => {
    setLoading(true);
    if (!data) {
      console.log("No file selected");
     setLoading(false);

      return;
    }
    const formData = new FormData();
    formData.append("reel", data);
    formData.append("caption", caption);
    try {
      const response = await axios.post(
        `${serverURL}/reels/upload/${authenticated.user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if(response){
      setLoading(false);
        toast.success("Reel uploaded");
        setOpen(false)
      }   
    } catch (e) {
       setLoading(false);
       setOpen(false)
      toast.error("Internal Server Error");
      console.log(e);
    }
  };
  return (
    <div className="w-[500px] mx-auto  p-4 rounded flex flex-col gap-4 items-center">
      {preview ? (
        <div className="relative w-full h-full text-center">
          <video
            src={preview}
            controls
            className="border-2 border-black w-fit mx-auto h-[60vh] rounded "
          />
          <div className="flex flex-col absolute right-6 gap-6 text-2xl bottom-28">
            <CiHeart />
            <IoShareSocialOutline />
            <SlDislike />
            <LiaCommentSolid />
          </div>
          <button
            onClick={() => {
              setData(null);
              setPreview(null);
            }}
            className="mt-2 text-red-500 hover:underline"
          >
            Change File
          </button>
        </div>
      ) : (
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="border-2 rounded h-[60vh]"
        />
      )}

      <input
        type="text"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        className="border-2 w-full rounded p-2"
        placeholder="Enter caption"
      />

      <button
        onClick={postData}
        className="w-40 bg-amber-500 px-6 py-2 hover:scale-105 duration-300 rounded text-white text-lg"
      >
       {loading?"Please wait...":"Upload Reel"} 
      </button>
    </div>
  );
};

export default AddReel;
