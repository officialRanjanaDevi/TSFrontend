"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import ProductCard from "../categories/ProductCard";
import ProductReviews from "../productReview/ProductReview";
import StoreReviewSec from "./StoreReviewSec";

const img_fashion = "/images/img_fashion.jpeg";

const StoreReview = ({ storeReviews }) => {
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  


  const [productReviews, setProductReviews] = useState()
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL
  const [sponseredProducts, setSponseredProducts] = useState([])

  const fetchReviews = () => {
    axios.post(`${serverURL}/api/v1/getReviews/${storeId}`)
      .then((res) => {
        setProductReviews(res.data.reviews);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchReviews();
  }, []);
  useEffect(() => {
    axios
      .get(`${serverURL}/api/v1/sponsoredProducts`)
      .then((res) => {
        setSponseredProducts(res.data)
      })
      .catch((err) => console.error(err));
  }, []);


  return (
    <div className="flex flex-col gap-4 items-start w-full">
      <div className="flex flex-col  items-start w-full">
        <StoreReviewSec storeReviews={storeReviews} />
      </div>
      <div className="w-full sm:w-[70vw]">
        <ProductReviews productReviews={productReviews} fetchReviews={fetchReviews}/>
      </div>

      <div className="flex flex-col items-start gap-4 w-full">
        <div className="flex items-center gap-2 ">
          <h2 className="text-base font-semibold">Sponsered Results</h2>
          <Image
            src={"/icons/ic_outline-info.svg"}
            width={16}
            height={16}
            alt=""
          />
        </div>
        <div className="flex  w-full overflow-auto gap-4">
          {sponseredProducts.map((product, key) => (
            <ProductCard key={key} productDetails={product.productId} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoreReview;
