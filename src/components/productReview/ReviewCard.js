import React, { useState, useRef, useContext, useEffect } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Image from "next/image";
import axios from "axios";
import Review from "../../components/store/Review";
import Popup from "./Popup";
import { UserContext } from "@/lib/UserContext";
const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ReviewCard = ({
  review,
  reviewerName,
  location,
  rating,
  description,
  images,
  onDelete,
  fetchReviews
}) => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLike = async () => {
    if (!hasLiked) {
      setLikes(likes + 1);
      setHasLiked(true);
      if (hasDisliked) {
        setDislikes(dislikes - 1);
        setHasDisliked(false);
      }
      try {
        await axios.put(
          `${serverURL}/api/v1/reviews/${review._id}/like`,
          {},
          {
            headers: {
              Authorization: `Bearer ${authenticated.token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error liking review:", error);
      }
    }
  };

  const handleDislike = async () => {
    if (!hasDisliked) {
      setDislikes(dislikes + 1);
      setHasDisliked(true);
      if (hasLiked) {
        setLikes(likes - 1);
        setHasLiked(false);
      }
      try {
        await axios.put(`${serverURL}/api/v1/reviews/${review._id}/dislike`, {
          headers: {
            Authorization: `Bearer ${authenticated.token}`,
          },
        });
      } catch (error) {
        console.error("Error disliking review:", error);
      }
    }
  };
  const handleDelete = () => {
    setShowDropdown(false);
    setShowConfirmation(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`${serverURL}/api/v1/reviews/delete/${review._id}`, {
        headers: {
          Authorization: `Bearer ${authenticated.token}`,
        },
      });
      if (typeof onDelete === "function") {
        onDelete(review._id);
      }
      fetchReviews()
    } catch (error) {
      console.error("Error deleting review:", error);
    }
    setShowConfirmation(false);
  };

  const cancelDelete = () => {
    setShowConfirmation(false);
  };

  const renderRatingStars = () => {
    const fullStars = Math.floor(rating);
    const remainingRating = rating - fullStars;
    const hasHalfStar = remainingRating >= 0.25 && remainingRating <= 0.75;

    const starIcons = [];

    for (let i = 0; i < fullStars; i++) {
      starIcons.push(
        <AiFillStar
          key={i}
          icon={AiFillStar}
          className="text-[#FAC50C] mr-0.5"
        />
      );
    }

    if (hasHalfStar) {
      starIcons.push(
        <AiFillStar key={fullStars} className="text-[#FAC50C] mr-0.5" />
      );
    }

    const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    for (let i = 0; i < remainingStars; i++) {
      starIcons.push(
        <AiOutlineStar key={fullStars + i + 1} className="text-gray-400" />
      );
    }

    return starIcons;
  };
 
  const {  reviewText, pictures ,userId} = review;
  const [showConfirmation, setShowConfirmation] = useState(false);
  return (
    <div className=" w-full  my-2 bg-white px-2 md:px-5 py-3 rounded-lg border-b ">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              width={20}
              height={20}
              src={
                (userId && userId?.profilePic)
                  ? userId?.profilePic?.url
                  : "/images/man.png"
              }
              alt="Reviewer Profile"
              className="w-14 h-14 rounded-full"
              onError={() => setProfileImage("/images/man.png")}
            />
          </div>
          <div>
            <div className="flex flex-col items-start justify-start gap-1">
              <div className="text-xl font-semibold">{userId?.name}</div>
              <div className="text-gray-500 text-sm">{location||"India"}</div>
              <div className="flex flex-row"></div>
            </div>
          </div>
        </div>
        {authenticated.name && userId?._id === authenticated.user?._id && (
          <div className="flex items-center space-x-2 relative">
            <div
              className="cursor-pointer font-bold text-2xl"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              ...
            </div>
            {showDropdown && (
              <div className="absolute right-0  top-7 mt-2 w-40 bg-white rounded-md shadow-md">
                <div
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  onClick={handleDelete}
                >
                  Delete
                </div>
                {/* Add more options as needed */}
              </div>
            )}
          </div>
        )}

        {/* Confirmation Popup */}
        {showConfirmation && (
          <Popup
            message="Are you sure you want to delete this review?"
            onConfirm={confirmDelete}
            onCancel={cancelDelete}
          />
        )}
      </div>
      <div className="flex flex-row text-gray-500 text-xl my-2">
        {renderRatingStars()} {}
      </div>
      <div className="mb-4 w-full md:w-[70%]">
        <p>{reviewText}</p>
      </div>
      <div className="flex mb-4 overflow-auto">
        {pictures.map((image, index) => (
          <img
            key={index}
            width={20}
            height={20}
            src={image.url} // Use the actual image URL from the pictures array
            alt={`Review Image ${index}`}
            className="w-24 h-24 md:h-40 md:w-40 object-cover rounded-md mr-2"
          />
        ))}
      </div>
      <div className="flex items-center">
        <button
          className="flex items-center border border-gray-300 text-gray-500 mr-4 px-2 py-1 rounded"
          onClick={handleLike}
        >
          <Image
            width={20}
            height={20}
            src="/images/product/Like.svg"
            alt="Reviewer Profile"
            className="w-5 h-5 mr-2"
          />
          Like {likes}
        </button>
        <button
          className="flex items-center border border-gray-300 text-gray-500 mr-4 px-2 py-1 rounded"
          onClick={handleDislike}
          disabled={hasDisliked}
        >
          <Image
            width={20}
            height={20}
            src="/images/dislike.svg"
            alt="Reviewer Profile"
            className="w-5 h-5 mr-2"
          />
          Dislike {dislikes}
        </button>
      </div>
      {isEditing && <Review review={review} />}
    </div>
  );
};

export default ReviewCard;
