"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";

import SkeletonLoader from "../../productCards/SkeletonLoader";
import ProductCard from "@/components/productCards/ProductCard";
import Pagination from "@/components/pagination/Pagination";
const ArrivalCart = ({selectedFilters }) => {
  const [arrivalData, setArrivalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [allProducts,setAllProducts]=useState([]);
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const productsPerPage = 12; 
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(  arrivalData?.length / productsPerPage);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const applyFilters = (products) => {
    let filteredProducts = [...products];
    if (selectedFilters?.storeId) {
      filteredProducts = filteredProducts.filter(
        (product) => product?.storeId === selectedFilters.storeId
      );
    }

    if (selectedFilters?.minPrice && selectedFilters?.maxPrice) {
      filteredProducts = filteredProducts.filter((product) => {
        const prices = [
          product?.Size?.XL?.trialshopyPrice,
          product?.Size?.M?.trialshopyPrice,
          product?.Size?.["free size"]?.trialshopyPrice,
        ].filter(Boolean); 
        return prices.some(
          (price) => price >= selectedFilters.minPrice && price <= selectedFilters.maxPrice
        );
      });
    }
    if (selectedFilters?.category) {
      filteredProducts = filteredProducts.filter((product) => {
        return Array.isArray(product.categories) && product.categories.includes(selectedFilters.category);
      });
    }
    return filteredProducts;
  };

  useEffect(() => {
    const fetchNewArrivalData = async () => {
      try {
        console.log(categoryId)
        if (!categoryId) {
          setArrivalData({ newArrivalProducts: [] });
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `${serverURL}/api/v1/arrivals/getAllByCategory/${categoryId}`
        );
        if (response.status !== 200) {
          throw new Error(
            `Error fetching new arrival data. Status: ${response.status}`
          );
        }
        console.log(response)
        setAllProducts(response.data)
        const filteredData= applyFilters(response.data)
        setArrivalData(filteredData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new arrival data:", error);
      }
    };

    fetchNewArrivalData();
  }, [serverURL, categoryId]);

  useEffect(()=>{
    const filteredData= applyFilters(allProducts)
    setArrivalData(filteredData);
  },[selectedFilters])


  return (
    <>
      <h1 className="font-poppins lg:text-[22px]   font-medium w-full p-2">
        New Arrivals 
      </h1>
      {loading ? (
        <div className="flex flex-col gap-2 my-3">
          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4">
            {Array.from(
              { length: Math.max(productsPerPage, 1) },
              (_, index) => (
                <SkeletonLoader key={index} />
              )
            )}
          </div>
        </div>
      ) : (
        <div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 p-2">
          {arrivalData &&
          arrivalData.length > 0 ? (
            arrivalData.slice((currentPage-1)*12,12*currentPage).map((product) => (
            <ProductCard key={product._id} productDetails={product} />
            ))

            
          ) : (
            <p>No product available</p>
          )}
       

        </div>
   <div className="w-full flex justify-center">
   {arrivalData?.length > 0 ? 
 <Pagination
 currentPage={currentPage}
 totalPages={totalPages}
 onPageChange={handlePageChange}
/>
: <></>}
   </div></div>
      )}
    </>
  );
};

export default ArrivalCart;
