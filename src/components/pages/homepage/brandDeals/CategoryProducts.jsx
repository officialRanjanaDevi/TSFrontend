"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "@/components/productCards/ProductCard";
import SkeletonLoader from "@/components/productCards/SkeletonLoader";

const CategoryProducts = ({ brandId }) => {
  const [data, setData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [brandsToShow, setBrandsToShow] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    const fetchPopularBrands = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/getPopularBrand`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching popular brands:", error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/products`);
        setProductDetails(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false); // Set loading to false when data is fetched
      }
    };

    fetchPopularBrands();
    fetchProductDetails();
  }, [serverURL]);

  useEffect(() => {
    if (brandId) {
      const brands = data.filter((brand) => brand._id === brandId);
      setBrandsToShow(brands);
    }
  }, [data, brandId]);

  // if (loading) {
  //     return <SkeletonLoader width={200} height={200} />;
  // }

  return (
    <>
      {brandsToShow.map((brand) => (
        <div key={brand._id} className="items-center md:h-ful mt-4">
          <div className="text-lg ml-2 font-bold">{brand.name}</div>
          <div className="flex gap-4 ml-2 w-full ">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {Array.from(Array(brand.products.length).keys()).map(
                  (index) => (
                    <SkeletonLoader key={index} width={200} height={200} />
                  )
                )}
              </div>
            ) : brand.products && brand.products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {brand.products.map((productId) => {
                  const product = productDetails.find(
                    (product) => product._id === productId
                  );
                  if (!product) return null;

                  return (
                    <ProductCard
                      key={productId}
                      productDetails={product}
                      defaultImage={{ url: "/path/to/default/image" }}
                    />
                  );
                })}
              </div>
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      ))}
    </>
  );
};

export default CategoryProducts;
