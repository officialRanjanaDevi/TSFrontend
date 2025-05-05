"use client";
import AddReel from "./AddReel";
import Pagination from "../../pagination/Pagination";
import { useEffect, useRef, useState, useContext } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
// import LiveProductComment from "./LiveProductComment";
import storage from "./firebase.config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import Loading from "@/components/common/Loading";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import ReelCard from "./ReelCard";
import { RxCross2 } from "react-icons/rx";
const Reels = () => {
  const [open, setOpen] = useState(false);
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [share, setShare] = useState(false);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(reels.length / 6);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const fetchReels = async () => {
    try {
      const response = await axios.post(
        `${serverURL}/reels/getReels/${authenticated.user._id}`
      );

      setReels(response.data.data);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchReels();
  }, []);
  return (
    <div className="w-full text-end p-4">
      <button
        className="px-4 py-1 border-2 border-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-100 transition"
        onClick={() => setOpen(true)}
      >
        + Add New Reel
      </button>

      {open && (
        <div className="z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 ">
          <div className="bg-white p-2 rounded-lg shadow-lg w-[500px] relative">
            <div
              className="absolute top-4 right-4"
              onClick={() => setOpen(false)}
            >
              <RxCross2 />
            </div>
            <AddReel setOpen={setOpen} fetchReels={fetchReels} />
          </div>
        </div>
      )}

      <div>
        <div className={loading ? "block" : "hidden"}>
          <Loading />
        </div>

        <div className={!loading ? "block" : "hidden"}>
          <div className="z-0 grid   grid-cols-1 sm:grid-cols-2 2xl:grid-cols-3 gap-2 sm:gap-x-20">
            {reels.map((reel, index) => (
              <div className="" key={reel._id}>
                <ReelCard
                  share={share}
                  setShare={setShare}
                  key={index}
                  src={reel.video}
                  liveProductData={reel}
                  fetchReels={fetchReels}
                />
              </div>
            ))}
          </div>
          {reels?.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Reels;
