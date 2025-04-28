import React, { useState, useEffect, useContext } from "react";
import StarRatingInput from "../star_rating/StarRatingInput";
import axios from "axios";
import { useRouter } from "next/navigation";
import { UserContext } from "@/lib/UserContext";
import toast from "react-hot-toast";
const StoreReviewComp = ({
  setReviewBoxOpen,
  storeId,
  setStoreReviews,
  storeReviews,
}) => {
  //console.log("storeReviews",storeReviews)
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [authenticated, setAuthenticated] = useContext(UserContext);

  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const router = useRouter();
  const addReview = (newReview) => {
    setStoreReviews([...storeReviews, newReview]);
  };

  const handleReviewSubmit = () => {
    if (authenticated.user._id) {
      const api = `${serverURL}/api/v1/storeReviews/${authenticated.user._id}/store/${storeId}`;

      axios
        .post(api, {
          reviewText: message,
          rating,
        })
        .then((res) => {
          addReview(res.data);
          setStoreReviews([...storeReviews, res.data]);
          toast.success("Review posted !")
        })
        .catch((err) => console.error(err));
    } else {
      router.push("/account/login");
    }

    setReviewBoxOpen(false);
  };
  return (
    <>
      <div className="flex flex-col w-full h-full z-[100] p-5 bg-white">
        <div className="flex w-full md:justify-center md:items-center ">
          <div className="w-full ">
            <div className="flex flex-col  bg-white">
              <div className="text-[32px] font-semibold ">
                Write a Store Review
              </div>
              <div className="text-[16px]  font-medium ">Rate the Store</div>
              <div className="py-2">
                <StarRatingInput rating={rating} setRating={setRating} />
              </div>

              <div className="py-1">Message</div>
              <textarea
                type="text"
                id="horizontalInput"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full h-[125px] px-4 py-2 mb-4 leading-tight text-gray-700 bg-transparent border-[1px] appearance-none border-[#BBC1CC] focus:outline-none"
                placeholder="Write message"
              />

              <div className="flex py-2 my-2">
                <button
                  className="p-3 text-[16px] rounded-[8px] w-1/2 mr-1 bg-[#EB8105] text-black "
                  onClick={handleReviewSubmit}
                >
                  Save
                </button>
                <button
                  className="p-3  text-[16px] rounded-[8px] w-1/2 ml-1 bg-black text-white "
                  onClick={() => setReviewBoxOpen(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreReviewComp;
