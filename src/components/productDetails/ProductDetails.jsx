"use client";
import React, { useState, useEffect, useRef } from "react";
import ProductDetailsComponent from "./ProductDetailsComponent";
import ProductInfo from "./ProductInfo";
import SimilarProducts from "./SimilarProducts";
import axios from "axios";
import Loading from "@/components/common/Loading";
import AddProductReview from "./AddProductReview";
import ProductReviews from "../productReview/ProductReview";
export const ProductDetails = (props) => {
  const { productId } = props;
  const [loading, setLoading] = useState(false);
  const [productData, setProductData] = useState(null);
  const [productReviews, setProductReviews] = useState([]);
  const [similarProducts, setSimilarProducts] = useState([]);

  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  useEffect(() => {
    const fetchProductData = async () => {
      setLoading(true);
      const apiUrl = `${serverURL}/api/v1/products/${productId}`;

      try {
        const response = await fetch(apiUrl, { method: "GET" });
        const res = await response.json();
        setProductData(res);

        const apiUrl3 = `${serverURL}/api/v1/products`;
        const similarProductsResponse = await axios.post(apiUrl3, {
          filters: { categories: res.category },
        });

        setSimilarProducts(similarProductsResponse.data.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProductReviews = async () => {
      const apiUrl2 = `${serverURL}/api/v1/reviews/${productId}`;

      try {
        const response = await axios.get(apiUrl2);
        // console.log("reviews:", response.data);
        setProductReviews(response.data);
      } catch (error) {
        console.error("Error fetching product reviews:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductData();
    fetchProductReviews();
  }, [productId, serverURL]);

  const handleNewReview = (newReview) => {
    setProductReviews([...productReviews, newReview]);
  };

  const handleReviewDelete = (reviewId) => {
    const updatedReviews = productReviews.filter(
      (review) => review._id !== reviewId
    );
    setProductReviews(updatedReviews);
  };

  return productData ? (
    <div className="w-full">
      {productData && <ProductDetailsComponent productData={productData} />}
      {productData && <ProductInfo productData={productData} />}
      <AddProductReview
        productId={productId}
        setProductReviews={setProductReviews}
        productReviews={productReviews}
        handleNewReview={handleNewReview}
      />
      <div className="w-[85vw] mx-auto  ">
      <ProductReviews
        productReviews={productReviews}
        onDelete={handleReviewDelete}
      />
      </div>

     
      {similarProducts?.length > 0 && (
        <SimilarProducts similarProducts={similarProducts} />
      )}
    </div>
  ) : (
    <Loading />
  );
};
