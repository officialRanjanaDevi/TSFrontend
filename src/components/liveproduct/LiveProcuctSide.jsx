"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import ScheduleVideo from "./ScheduleVideo";
import axios from "axios";
import { Button, Carousel } from "antd";
import Link from "next/link";
import { SampleNextArrow, SamplePrevArrow } from "../pages/homepage/NearBy";
import { UserContext } from "@/lib/UserContext";
function LiveProcuctSide({ data }) {
  const [showScheduleVideo, setShowScheduleVideo] = useState(false);
  const [meetings, setMeetings] = useState([]);
 
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const handleScheduleLiveClick = () => {
    setShowScheduleVideo(true);
  };

  useEffect(() => {
    const fetchMeetings = async () => {
      if(authenticated.user._id){

      
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/meetings/${authenticated.user._id}`
        );
        setMeetings(response.data.meetings);
     
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }}
    };

    fetchMeetings();
  }, [authenticated]);
  return (
    <>
      {showScheduleVideo && (
        <ScheduleVideo
          setShowScheduleVideo={setShowScheduleVideo}
          storeId={data?._id}
        />
      )}
      <div className="flex flex-col gap-5">
        <Link   href={`nearByStore/store?storeId=${data?._id}`}>
        <div  className="flex items-start  gap-2 text-sm font-bold lg:text-2xl mt-4">
          <img src={data.images[0].url} alt="..." className="rounded-full h-16 w-24 p-1" />
          <div>
          <p>{data.storeName}</p>
          <p className="font-medium text-[10px] leading-4 text-neutral-500">{data.storeDescription}</p>
          <p className="font-medium text-[10px] text-neutral-500 leading-4">{data.city}</p>
          </div>
         
        </div>
        </Link>
        <div className="border-4 bg-[#EAEAEA] p-2 text-left  w-full">
          <p>
            Store at: {data.city}, {data.state} 
          </p>
        </div>
        <div className="mt-5">
          <h2 className="text-xl font-bold mb-2">Scheduled Meetings</h2>
          <div className="grid w-full grid-cols-2 gap-2 my-4 ">
          <button
            onClick={handleScheduleLiveClick}
            className="  h-8 rounded bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border"
          >
            Schedule Live
          </button>
          <button className=" h-8 rounded bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border">
            See All
          </button>
        </div>
          {meetings.length > 0 ? (
            <div className="w-[30vw]  grid w-full grid-cols-2 gap-6 sm:grid-cols-2">
              {meetings.map((meeting, index) => (
                <div
                  key={index}
                  className={`rounded-md max-w-60 border-2 ${meeting.status==="confirmed"?"border-green-200":"border-red-500"} overflow-hidden `}
                >
                  <div className="p-2 text-[12px] sm:text-sm">
                    <h3 className="text-[12px] sm:text-lg font-semibold">{meeting.title}</h3>
                    <p>Status: {meeting.status}</p>
                    <p>Date: {new Date(meeting.date).toLocaleDateString()}</p>
                    <p>Time: {meeting.time}</p>
                    <p>For Product:</p>

                    <div className="inline-flex gap-2 overflow-x-auto">
                      {meeting.products.map((product, index) => {
                        return (
                          <img
                  
                            key={index}
                            src={product?.productImage}
                            alt={product.productName}
                            className="rounded-lg w-full h-40 "
                          />
                        );
                      })}
                    </div>
                  </div>
                  {/* {meeting.status === "confirmed" ? (
                    <div className="w-full bg-green-200 p-2 text-center">
                      <Link
                        className="bg-green-700 text-white rounded-lg px-2 py-1"
                        href={`/livemeeting/meeting/${meeting._id}`}
                      >
                        Join Video Call
                      </Link>
                    </div>
                  ) : (
                    <></>
                  )} */}
                </div>
              ))}
            </div>
          ) : (
            <p>No meetings scheduled.</p>
          )}
        </div>
    
       
       
      </div>
    </>
  );
}

export default LiveProcuctSide;
