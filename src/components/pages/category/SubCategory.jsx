"use client";
import AllProductsGrid from "@/components/productCards/AllProductsGrid";
import React, { useState, useEffect } from "react";
import Pagination from "@/components/pagination/Pagination";

const SubCategory = ({ data, selectedFilters }) => {
  const [cardTitle, setCardTitle] = useState([]);
  const [fetchedProducts, setFetchedProducts] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 16;
  console.log(data,"im here")
  useEffect(() => {
    // Function to apply filters
    const applyFilters = (products) => {
      let filteredProducts = [...products];

      if (selectedFilters?.storeId) {
        filteredProducts = filteredProducts.filter(
          (product) => product.storeId === selectedFilters.storeId
        );
      }
      if(selectedFilters?.minPrice&&selectedFilters?.maxPrice){
        filteredProducts = filteredProducts.filter(
          (product) => (product?.Size?.XL?.trialshopyPrice < selectedFilters.maxPrice && product?.Size?.XL?.trialshopyPrice> selectedFilters.minPrice)||
          (product?.Size?.M?.trialshopyPrice < selectedFilters.maxPrice && product?.Size?.M?.trialshopyPrice> selectedFilters.minPrice)||
          (product?.Size?.["free size"]?.trialshopyPrice < selectedFilters.maxPrice && product?.Size?.["free size"]?.trialshopyPrice> selectedFilters.minPrice)||
          (product?.Size?.M7?.trialshopyPrice < selectedFilters.maxPrice && product?.Size?.M7?.trialshopyPrice> selectedFilters.minPrice)
        );
      }


      return filteredProducts;
    };

    const filteredProducts = applyFilters(data);
    setFetchedProducts(filteredProducts);
    setCurrentPage(1); 
  }, [data, selectedFilters]);

  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = fetchedProducts.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div>
        <div className="w-full px-5 lg:p-0">
          {fetchedProducts.length > 0 ? (
            <>
              <AllProductsGrid
                title={cardTitle || "Title Here"}
                cards={displayedProducts} // Ensure this is the filtered and paginated list
              />
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(fetchedProducts.length / productsPerPage)}
                onPageChange={handlePageChange}
              />
            </>
          ) : (
            <div className="">
              <div className="my-3 text-2xl font-semibold lg:block">
                {cardTitle || "Title Here"}
              </div>
              <h2>No Products</h2>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SubCategory;
