"use client";
import Liveprodict from "./LiveProduct";
import Searchbox2 from "./Searchbox2";
import { useEffect, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import LiveProductComment from "./LiveProductComment";
import storage from "./firebase.config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Loading from "@/components/common/Loading";
import { io } from "socket.io-client";
import { useRoom } from "@/lib/LiveStreamContext";
import { useRouter } from "next/navigation";
import axios from "axios";
import ReelCard from "./reel/ReelCard";
import { BiCommentDetail } from "react-icons/bi";
import { FaShare } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

function LiveproductPage() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [share, setShare] = useState(false);
  const [comment, setComment] = useState(false);
  const [videoList, setVideoList] = useState([]);
  const [liveStreams, setLiveStreams] = useState([]);
  const socket = useRef(null);
  const { setRoomID } = useRoom();
  const router = useRouter();

  useEffect(() => {
    socket.current = io(process.env.NEXT_PUBLIC_BASE_API_URL_SELLER);
    
    socket.current.on("liveStreamStatus", (streams) => {
      setLiveStreams(streams);
    });

    return () => {
      socket.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const videoListRef = ref(storage, `videos/`);
    listAll(videoListRef)
      .then((response) => {
        return Promise.all(response.items.map((item) => getDownloadURL(item)));
      })
      .then((urls) => {
        setVideoList(urls);
      })
      .catch((error) => {
        console.error("Error loading video URLs:", error);
      });
  }, []);

  const handleJoinLiveStream = (roomID) => {
    setRoomID(roomID);
    router.push("/liveproduct/livestream");
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const fetchReels = async () => {
    try {
      const [storeResponse, customerResponse] = await Promise.all([
        axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/reels/getAllReels`),
        axios.get(`${process.env.NEXT_PUBLIC_BASE_API_URL}/reels/getAllReels`),
      ]);
      console.log(customerResponse)
      const mergedReels = shuffleArray([
        ...(storeResponse.data.data || []),
        ...(customerResponse.data.data || []),
      ]);
      setReels(mergedReels);
    } catch (error) {
      console.error("Error fetching reels:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReels();
  }, []);

  return (
    <div className="container mx-auto">
      {liveStreams.length > 0 ? (
        <div>
          <h2>Live Streams</h2>
          <div className="flex items-center gap-3">
            {liveStreams.map((stream, index) => (
              <div
                key={index}
                className="relative w-24 h-24 rounded-full border-2 border-red-500 flex items-center justify-center cursor-pointer"
                onClick={() => handleJoinLiveStream(stream.roomId)}
              >
                <img
                  src={stream.storeLogo}
                  alt={stream.storeName}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="absolute -bottom-2 px-1 bg-white rounded">
                  <span className="bg-red-500 text-white px-2 py-0.5 text-xs rounded-sm">Live</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>No live streams currently</p>
      )}

      {comment && <LiveProductComment comment={comment} setComment={setComment} />}

      <div className="mx-2 md:mx-24 my-5 relative flex justify-between">
        <Searchbox2 />
      </div>

      {loading ? (
         <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center ">
         {[...Array(6)].map((_, index) => (
              <div key={index} className="relative flex items-center mx-auto h-[70vh] lg:m-0 w-80  shadow-md ">
                  <div className="w-full h-full bg-gray-400 animate-pulse rounded"></div>
                  <div className="absolute -right-20  flex flex-col  items-center justify-end gap-1 pb-2 mr-5  bottom-0  sm:left-80 sm:gap-3">
               <div className="flex flex-col gap-1 ">
              
                   <div className=" flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                     <AiOutlineLike
                       className="w-12 text-2xl "
                   
                     />
                   </div>
              
             
               </div>
               <div className="flex flex-col gap-1 ">
             
                   <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                     {" "}
                     <AiOutlineDislike
                       className="w-12 text-2xl"
                     
                     />
                   </div>
           
               </div>
               <div
                 className="flex flex-col items-center gap-1"
             
               >
                 <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                   <BiCommentDetail className="w-12 text-2xl" />
                 </div>
             
               </div>
               <div
                 className="flex flex-col gap-1 "
          
               >
                 <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400">
                   <FaShare className="w-12 text-2xl" />
                 </div>
              
               </div>
               <div
                 className="flex flex-col gap-1 cursor-pointer"
               >
                 <div className="flex items-center w-10 h-10 bg-white rounded-full sm:bg-gray-400 ">
                   <SlOptions className="w-12 text-2xl " />
                 </div>
               </div>
         
             </div>
 
             
            </div>
           ))}
         </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 place-items-center">
          {reels.map((reel, index) => (
            <div key={index}>
              {reel.type === "store" ? (
                <Liveprodict share={share} setShare={setShare} setComment={setComment} src={reel.video} liveProductData={reel} />
              ) : (
                <ReelCard share={share} setShare={setShare} setComment={setComment} src={reel.video} liveProductData={reel} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LiveproductPage;