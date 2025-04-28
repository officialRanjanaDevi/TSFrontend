"use client";
import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { AiFillCaretDown } from "react-icons/ai";
import ProgressBar from "@ramonak/react-progress-bar";
import StarRating from "../star_rating/StarRating";
import StarRatingInput from "../star_rating/StarRatingInput";
import { UserContext } from "@/lib/UserContext";
import axios from "axios";
const StoreReview1 = ({ storeData, storeReviews }) => {
  const [reviewed, setReviewed] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const [bestReview, setBestReview] = useState();
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    axios.post(`${serverURL}/api/v1/getReviews/${storeData._id}`)
      .then((res) => {
        setBestReview(res.data.reviews[0])
      })
      .catch((err) => console.error(err));
  }, [])
  //console.log('userReview',userReview)
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [rating, setRating] = useState(0);

  const [progressData, setProgressData] = useState(null);

  useEffect(() => {
    if (authenticated.user._id && storeReviews.length > 0) {
      const review=storeReviews.filter((review)=>{
        if(review.userId._id===authenticated.user._id){
          console.log(review.userId._id ,authenticated.user._id)
          return review
        }
      })
      // console.log(review[0],"hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
      if (review[0]) {
        console.log(review[0],"hhhhhhhhhhhhhhhhh")
        setReviewed(true);
        setUserReview(review[0]);
        setRating(review[0].rating);
      }

      let categorizedReview = {
        5: [],
        4: [],
        3: [],
        2: [],
        1: [],
      };

      storeReviews.forEach((review) => {
        if (!categorizedReview[review.rating]) {
          categorizedReview[review.rating] = [];
        }
        categorizedReview[review.rating].push(review);
      });

      let progressData = {};
      Object.keys(categorizedReview).forEach((cat) => {
        progressData[cat] =
          (categorizedReview[cat].length / storeReviews.length) * 100;
      });

      setProgressData(progressData);

    
    } else {
      // If user doesn't exist or there are no reviews
      let categorizedReview = {
        5: [],
        4: [],
        3: [],
        2: [],
        1: [],
      };

      let progressData = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
      if (authenticated.user._id) {
        const ProcessData = async () => {
          await storeReviews.map((review) => {
            if (review.userId._id === authenticated.user._id) {
              setReviewed(true);
              setUserReview(review);
              setRating(review.rating);
            }
            categorizedReview[review.rating].push(review);
          });
        };

        ProcessData().then(() => {
          Object.keys(categorizedReview).map((cat) => {
            progressData[cat] =
              (categorizedReview[cat].length / storeReviews.length) * 100;
          });
        });
        setProgressData(progressData);
      }
    }
  }, [authenticated.user._id, storeReviews]);
  return (
    <div className="w-full">
      <section className="sm:w-full">
      {bestReview ? (<>
        <p className=" text-sm  font-fontBold">Recommended Product Reviews</p>
        
          <section className="flex flex-col md:flex-row justify-between border-2 shadow-md my-2 p-4 items-center gap-2">
            <div className="flex flex-row justify-between md:justify-center   items-start md:items-center  gap-4">
              <img src={bestReview?.userId?.profilePic?.url || "/images/man.png"} alt="" className="bg-amber-600 h-16 w-16  md:h-20 md:w-20 rounded-full" />
              <div>
                <p className="capitalize">{bestReview?.userId?.name}</p>
                <div className="flex gap-2 text-neutral-500">
                  <p className="">Likes: {bestReview.pictures && bestReview?.likes.length}</p>
                  <p>Dislikes: {bestReview.pictures && bestReview?.dislikes.length}</p>
                </div>

                <img src={bestReview.pictures && bestReview?.pictures[0]?.url} className="h-20 w-20 rounded"></img>

              </div>

            </div>
            <div className="flex flex-col justify-between items-center w-fit">
              <p><StarRating stars={bestReview?.rating} /></p>
              <p className="capitalize">{bestReview?.reviewText}</p>
            </div>


          </section></>) : (<></>)}



        {userReview ? (
          <section className="border-2 shadow-md mt-6 flex flex-col sm:flex-row justify-center sm:h-auto mt-4  sm:justify-between sm:w-full sm:px-4 ">
            <section className="flex sm:flex-row justify-center py-2">
              <img
           
                src={userReview?.userId?.profilePic?.url||"/images/man.png" }
                className="h-16 w-16  md:h-20 md:w-20py-2 sm:py-10"
                alt=""
              />
              <section className="sm:justify-self-start items-center justify-center py-2 sm:py-10 mx-2 ">
                <p className="font-fontMedium text-lg capitalize">
                  {userReview?.userId?.name}
                </p>
                <p className="font-light text-sm">{userReview?.reviewText}</p>
              </section>
            </section>
            {authenticated ? (
              <section className="pb-2 flex flex-col items-center justify-center ">

                <div className=" flex">
                  {rating ? (
                    <>
                      {[...Array(rating)].map((_, index) => (
                        <p key={index} className="text-[40px] text-yellow-500"> &#9733;</p>
                      ))}
                      {[...Array(5 - rating)].map((_, index) => (
                        <p key={index + rating} className="text-[40px] text-neutral-300"> &#9733;</p>
                      ))}
                    </>
                  ) : (
                    <StarRatingInput rating={rating} setRating={setRating} />
                  )}
                </div>


                {reviewed ? (
                  <p className="sm:p-2 font-fontBold text-lg">
                    Your Review of {storeData?.storeName}
                  </p>
                ) : (
                  <p className="sm:p-2 font-fontBold text-xs">
                    Start your review of {storeData?.storeName}
                  </p>
                )}
              </section>
            ) : (
              <p>login </p>
            )}
          </section>
        ) : (
          <section className="mt-6 flex flex-col sm:flex-row justify-center sm:h-auto border sm:justify-between sm:w-full sm:px-4 ">
            <section className="flex sm:flex-row justify-center">
              <Image
                width={58}
                height={58}
                src="/images/man.png"
                className="py-2 sm:py-10"
                alt=""
              />
              <section className="sm:justify-self-start items-center justify-center py-2 sm:py-10 mx-2 ">
                <p className="font-fontMedium text-lg">
                  username
                </p>
                <p className="font-light text-sm">user email</p>
              </section>
            </section>
            {authenticated ? (
              <section className="flex flex-col items-center justify-around  ">
                <StarRatingInput rating={rating} setRating={setRating} />
                {reviewed ? (
                  <p className="sm:p-2 font-fontBold text-xs">
                    Your Review of {storeData?.storeName}...
                  </p>
                ) : (
                  <p className="sm:p-2 font-fontBold text-xs">
                    Start your review of {storeData?.storeName}
                  </p>
                )}
              </section>
            ) : (
              <p>login </p>
            )}
          </section>
        )}
      </section>
      <section className="sm:w-full sm:py-3 border-y border-slate-400 ">
        <section className="flex flex-col sm:flex-row gap-20">
          <section className="sm:m-4 flex flex-col justify-center sm:justify-start sm:justify-self-end  items-center">
            <span className="font-fontMedium text-sm sm:m-5 ">
              Overall rating
            </span>
            <section className="flex sm:m-3">
              <span className="border w-[2rem] sm:w-[3rem] m-2 bg-green-700 text-white border-green-600 sm:text-lg rounded-lg text-center ">
                {storeData?.rating?.rating}
              </span>
              <StarRating stars={storeData?.rating?.rating} />
            </section>
            <section className="sm:m-5">{storeReviews?.length} Reviews</section>
          </section>
          {progressData && (
            <section className="sm:ml-16 sm:py-7 sm:w-2/4 ">
              {Object.keys(progressData).map((progress, index) => {
                return (
                  <section key={index} className="flex m-1">
                    <label className="m-1 font-fontMedium text-xs">
                      {progress} Stars
                    </label>
                    <ProgressBar
                      height={10}
                      completed={progressData[progress]}
                      className="w-4/5 m-2"
                      bgColor="grey"
                      isLabelVisible={false}
                    />
                  </section>
                );
              })}
            </section>
          )}
        </section>
      </section>
    </div>
  );
};

export default StoreReview1;
