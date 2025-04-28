import React from "react";
import ReviewCard from "./ReviewCard";

const ProductReviews = ({ productReviews, onDelete ,fetchReviews}) => {
  return (
    <div className=" mx-auto my-6 p-2 w-full">
      <p className="text-xl font-semibold">Product Reviews</p>

      {productReviews && productReviews.length > 0 ? (
        productReviews.map((review, index) => {
          return (
            <ReviewCard
              key={index}
              review={review}
              rating={review.rating}
              onDelete={onDelete}
              fetchReviews={fetchReviews}
            />
          );
        })
      ) : (
        <div>
          <p>No reviews available.</p>
        </div>
      )}
    </div>
  );
};

export default ProductReviews;
