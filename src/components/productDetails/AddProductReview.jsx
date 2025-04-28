"use client";
import React, { useState, useEffect, useContext } from "react";
import Review from "../store/Review";
import { UserContext } from "@/lib/UserContext";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
const AddProductReview = ({ productId, setProductReviews, productReviews ,handleNewReview}) => {
  const [reviewBoxOpen, setReviewBoxOpen] = useState(false);
  const [authenticated] = useContext(UserContext);
   const pathname = usePathname();
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  const signInClick = () => {
    router.push(`/account/login?ret=${encodeURIComponent(url)}`);
  };

  return (
    <>
      <div className="lg:px-[120px] flex flex-col  mx-auto px-4 ">
        {/* Use flex-col to arrange items vertically */}
        <div className="flex justify-between border-b-2 ">
          <div>
            <h1 className="text-base font-semibold lg:text-xl">Review</h1>
          </div>

          { (authenticated.user && authenticated.user._id)?
          <div
          className="px-4 py-2 text-xs text-white bg-black border border-gray-400 cursor-pointer sm:px-8"
          onClick={() => setReviewBoxOpen(!reviewBoxOpen)}
        >
          <div className="">Write a Review</div>
       </div>: 
         
            <div
              className="px-4 py-2 text-xs text-white bg-black border border-gray-400 cursor-pointer sm:px-8"
              onClick={() => signInClick()}      >
              <div className="">Write a Review</div>
           </div> 

      
        }
        </div>
      </div>
      {reviewBoxOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="relative lg:w-4/5 xl:w-[600px] 2xl:w-[600px]">
            <Review
              setReviewBoxOpen={setReviewBoxOpen}
              productId={productId}
              setProductReviews={setProductReviews}
              productReviews={productReviews}
              handleNewReview={handleNewReview}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddProductReview;
