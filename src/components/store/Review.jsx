import React, { useContext, useRef, useState } from "react";
import StarRatingInput from "../star_rating/StarRatingInput";
import axios from "axios";
import Image from "next/image";
import { UserContext } from "@/lib/UserContext";
import toast from "react-hot-toast";
import { Spin } from "antd";

const Review = ({
  setReviewBoxOpen,
  productId,
  setProductReviews,
  productReviews,
  handleNewReview
}) => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);
  const [images, setProductImageFile] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loaderAddCart, setLoaderAddCart] = useState(false);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const fileInputRef = useRef(null);
  const addReview = (newReview) => {
    console.log("newReview", newReview);
    setProductReviews([...productReviews, newReview]);
    handleNewReview(newReview)

  };
  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleRemoveImage = (index) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
    setProductImageFile(updatedFiles);
  };

  const AddReview = async (e) => {
    e.preventDefault();

    const userId = authenticated.user._id;
    if (!userId) {
      toast.error("User is not available.");
      return;
    }

    // Validate rating, message, and images
    if (rating === 0) {
      toast.error("Please provide a rating.");
      return;
    }

    if (!message.trim()) {
      toast.error("Please enter a message.");
      return;
    }

    if (images.length < 1) {
      toast.error("Please upload at least one image.");
      return;
    }

    try {
      setLoaderAddCart(true);
      const responseData = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/api/upload`,
        { images }
      );


      const reviewData = {
        rating: rating,
        reviewText: message,
        pictures: responseData.data.urls,
      };

      const response = await axios.post(
        `${serverURL}/api/v1/reviews/${userId}/products/${productId}`,
        reviewData,
        {
          headers: {
            Authorization: `Bearer ${authenticated.token}`,
          },
        }
      );
      // Pass the newly created review to the parent component
      addReview(response.data);
      setProductReviews([...productReviews, response.data]);
    } catch (error) {
      console.error("Error adding review:", error);
    } finally {
      setLoaderAddCart(false);
    }

    setMessage("");
    setSelectedFiles([]);
    setReviewBoxOpen(false);
  };

  const registerDataChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.length + selectedFiles.length > 5) {
      alert("Exceeds maximum allowed images");
      return;
    }

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setSelectedFiles((old) => [...old, reader.result]);
          setProductImageFile((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      <div className="flex flex-col w-full h-full z-[100] p-5 bg-white rounded-md">
        <div className="flex w-full md:justify-center md:items-center">
          <div className="w-full">
            <div className="flex flex-col p-5 bg-white border-2 rounded-md border-gray">
              <div className="text-[32px] font-semibold mt-5">
                Write a Review
              </div>
              <div className="text-[16px] font-medium mt-4">
                Rate the product
              </div>
              <div className="py-2 mt-2">
                <StarRatingInput rating={rating} setRating={setRating} />
              </div>
              <div className="py-1">Message</div>
              <textarea
                type="text"
                id="horizontalInput"
                className="w-full h-[125px] px-4 py-2 mb-4 leading-tight text-gray-700 bg-transparent border-[1px] appearance-none border-[#BBC1CC] focus:outline-none"
                placeholder="Write message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <div className="py-1 mb-1">Add Photo</div>
              <div className="flex items-center mb-2">
                <input
                  className="w-64 order-1 lg:order-none"
                  type="file"
                  ref={fileInputRef}
                  name="avatar"
                  accept="image/*" //any type of image acceptable
                  autoComplete="off"
                  onChange={registerDataChange}
                  style={{ display: "none" }}
                  multiple
                />
                <button
                  className="p-2 text-sm rounded-md bg-[#EB8105] text-white mr-2"
                  onClick={handleFileUpload}
                >
                  Upload Image
                </button>
                <div className=" mt-4 gap-5 flex">
                  {selectedFiles.map((file, index) => (
                    <div key={index} className="relative mr-2">
                      <span
                        className="absolute top-0 right-0 cursor-pointer"
                        onClick={() => handleRemoveImage(index)}
                      >
                        &#10005;
                      </span>
                      <img
                        src={file}
                        width={50}
                        height={50}
                        alt={`Uploaded Image ${index + 1}`}
                        className="object-cover rounded-full"
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex py-2 my-2">
                <button
                  className="p-3 text-[16px] rounded-[8px] w-1/2 mr-1 bg-[#EB8105] text-black"
                  onClick={AddReview}
                  type="button"
                >
                  {loaderAddCart ? (
                    <>
                      <Spin /> <span>Submitting Review</span>
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
                <button
                  className="p-3 text-[16px] rounded-[8px] w-1/2 ml-1 bg-black text-white"
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

export default Review;
