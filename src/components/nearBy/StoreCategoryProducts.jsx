"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import ProductCard from "../productCards/ProductCard";
import Pagination from "../pagination/Pagination";
const StoreCategoryProducts = ({ selectedFilters }) => {
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const params = useParams();
  const storeId = params.storeId;
  const category = params.category;
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const fetchChildCat = async () => {
    try {
      const res = await axios.post(
        `${serverURL}/api/v1/getChildCategories/${storeId}/${category}`
      );
      setProducts(res.data.products);
      setCategories(res.data.filteredCategories);

      const filteredCategoryIds = new Set(
        res.data.filteredCategories.map((cat) => cat.id)
      );

      const updatedAllCategories = res.data.AllChildCategories.filter(
        (cat) => !filteredCategoryIds.has(cat.id)
      );

      setAllCategories(updatedAllCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    if (storeId && category) {
      fetchChildCat();
    }
  }, [storeId, category]);


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    // Function to apply filters
    const applyFilters = (products) => {
      let filteredProducts = [...products];

      if (selectedFilters?.storeId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.storeId === selectedFilters.storeId
        );
      }
      if (selectedFilters?.minPrice && selectedFilters?.maxPrice) {
        filteredProducts = filteredProducts.filter(
          (product) =>
            (product?.Size?.XL?.trialshopyPrice < selectedFilters.maxPrice &&
              product?.Size?.XL?.trialshopyPrice > selectedFilters.minPrice) ||
            (product?.Size?.M?.trialshopyPrice < selectedFilters.maxPrice &&
              product?.Size?.M?.trialshopyPrice > selectedFilters.minPrice) ||
            (product?.Size?.FreeSize?.trialshopyPrice <
              selectedFilters.maxPrice &&
              product?.Size?.FreeSize?.trialshopyPrice >
                selectedFilters.minPrice)
        );
      }

      return filteredProducts;
    };

    const filteredProducts = applyFilters(products);
    setFetchedProducts(filteredProducts);
    setCurrentPage(1);
  }, [products, selectedFilters]);
  

  return (
    <div className="h-screen w-full ">
      {/* Categories Section */}
   
        <div className="flex overflow-hidden gap-4 ">
          {categories.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category._id}
                href={`/nearByStore/store/${storeId}/${category._id}`}
              >
                <div className="h-20 w-20 md:h-24 md:w-24  lg:h-32 lg:w-32 hover:shadow-md p-3 rounded-full hover:scale-105 duration-300">
                  <img
                    src={category?.image?.url}
                    alt={category.name}
                    className="h-full w-full object-cover rounded-full"
                  />
                </div>
                <p className="text-center text-xs md:text-sm lg:text-md">{category.name}</p>
              </Link>
            ))
          ) : (
            <></>
          )}
          {allCategories.length > 0 ? (
            allCategories.map((category) => (
              <div className="flex flex-col ">
                <div className="h-20 w-20 md:h-24 md:w-24  lg:h-32 lg:w-32  hover:shadow-md p-3 rounded-full  duration-300">
                  <img
                    src={category?.image?.url}
                    alt={category.name}
                    className="h-full w-full opacity-60 object-cover rounded-full"
                  />
                </div>
                <p className="text-center  text-xs md:text-sm lg:text-md text-gray-400">{category.name}</p>
              </div>
            ))
          ) : (
            <></>
          )}
        </div>

      <div className=" grid items-center grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 lg:gap-8 ">
        {fetchedProducts.length > 0 ? (
          fetchedProducts.map((product, index) => (
            <ProductCard productDetails={product} key={index} />
          ))
        ) : (
          <p className="text-white text-center">No Products Found</p>
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(products.length / productsPerPage)}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default StoreCategoryProducts;
