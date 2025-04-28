"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductGrid1 from "./ProductGrid1";
import Pagination from "@/components/pagination/Pagination";

const AllPopularMerchants = ({ categoryId, categoryName }) => {
  const [popularStores, setPopularStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchedCategories,setFetchedcategories]=useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  
  useEffect(() => {
    const fetchData = async () => {
      if(!categoryId){
        return
      }
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/merchants/popular/${categoryId}`
        );
        setPopularStores(response.data);
        setLoading(false);
     
      } catch (error) {
        console.error("Error fetching popular stores:", error);
      }
    };

    fetchData();
  }, [serverURL,categoryId]);

  // Filter popular stores based on category name or ID



  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedStores = popularStores.slice(startIndex, endIndex);
  const [filteredStores, setFilteredStores] = useState([]);

  useEffect(() => {
    setFilteredStores(popularStores)
  }, [popularStores]);



  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <div className="font-bold text-2xl ml-3 lg:ml-0 py-2">
        Popular Shops Near You
      </div>

      <h1 className="font-poppins underline decoration-[#ed8605] underline-offset-[5px] decoration-2 lg:text-[20px] text-[14px] font-fontMedium w-full ml-3 lg:ml-0">
        POPULAR IN {categoryName ? categoryName.toUpperCase() : ""}
      </h1>

      <div className="mt-4 lg:m-0 w-full">
        {loading ? (
          <p>Loading...</p>
        ) : filteredStores.length > 0 ? (
          <ProductGrid1 products={filteredStores} />
        ) : (
          <div className="flex justify-center my-24 md:mx-48 mx-4 py-10 text-center px-2 md:px-0 font-bold text-lg shadow-md hover:shadow-lg border">
            <p>No products are available for the selected category.</p>
          </div>
        )}
      </div>
      {filteredStores.length > 0 ? (
        <Pagination
          currentPage={currentPage}
          totalPages={Math.ceil(filteredStores.length / productsPerPage)}
          onPageChange={handlePageChange}
          maxVisiblePages={1}
        />
      ) : (
        <div className="flex justify-center my-24 font-bold text-lg"></div>
      )}
    </>
  );
};

export default AllPopularMerchants;
