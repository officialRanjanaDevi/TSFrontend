"use client";
import React, { useEffect, useState } from "react";
import PopularProducts from "./PopularProducts";
import axios from "axios";
import Pagination from "@/components/pagination/Pagination";

const AllPopularMerchantsGrid = () => {
  const [activeTab, setActiveTab] = useState("");
  const [popularStores, setPopularStores] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const paginatedStores = popularStores.slice(startIndex, endIndex);
  const [filteredStores, setFilteredStores] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/getAllMerchantPopular`
        );
        setPopularStores(response.data);
      } catch (error) {
        console.error("Error fetching popular stores:", error);
      }
    };

    fetchData();

    const fetchCategories = async () => {
      if (sessionStorage.getItem("homeCategories")) {
        setCategories(JSON.parse(sessionStorage.getItem("homeCategories")));
      } else {
        try {
          const response = await axios.get(
            `${serverURL}/api/v1/homeCategories`
          );
          setCategories(response.data);

          // If there are categories fetched successfully and at least one category exists
          if (response.data.length > 0) {
            handleTabClick(response.data[0]._id); // Set the active tab to the first category
          }
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      }
    };

    fetchCategories();
  }, [serverURL]);

  useEffect(() => {
    const updatedStores = popularStores.filter((store) =>
      store.categories.includes(activeTab)
    );
    setFilteredStores(updatedStores);
  }, [activeTab, popularStores]);

  const handleTabClick = (categoryID) => {
    setActiveTab(categoryID);
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <>
      <div className="font-bold py-4 text-2xl">Popular Shops Near You</div>
      <div className="flex items-center gap-7">
        {/* Menu bar on the left */}
        <div className="cursor-pointer md:hidden" onClick={toggleCategories}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </div>

        {/* Categories for medium screens and above */}
        {/* <div className="items-center gap-7 -ml-8 grid-container overflow-x-auto whitespace-nowrap ">
                {categories.map((category) => (
                <div
                key={category._id}
                className={`cursor-pointer inline-block
                ${
                    activeTab === category._id
                        ? 'font-bold hover:font-bold ml-8 hover:text-[16px] text-[16px] underline decoration-[#ed8605] underline-offset-[5px] decoration-2'
                        : ' hover:font-bold text-[15px] ml-8'
                }`
            }
            onClick={() => handleTabClick(category._id)}>
            {`POPULAR IN ${category.name.toUpperCase()}`}
        </div>
    ))}
               </div> */}

        <div className="items-center md:flex-row lg:flex-row gap-7 hidden md:flex lg:flex grid-container overflow-x-auto whitespace-nowrap">
          {categories.map((category) => (
            <div key={category._id}>
              <p
                className={`cursor-pointer mt-4
                    ${
                      activeTab === category._id
                        ? "font-bold hover:font-bold underline decoration-[#ed8605] underline-offset-[5px] decoration-2"
                        : "hover:font-bold hover:underline hover:underline-decoration-[#ed8605] hover:underline-offset-[5px]"
                    }`}
                onClick={() => handleTabClick(category._id, category.name)}
              >
                {`Popular in ${category.name}`}
              </p>
            </div>
          ))}
        </div>
        {/* Dropdown content for smaller screens */}
        {showCategories && (
          <div className="md:hidden absolute z-50 mt-[16rem] bg-white rounded-md shadow-lg">
            {categories.map((category) => (
              <div
                key={category._id}
                className={`py-2 px-4 cursor-pointer hover:bg-gray-100 ${
                  activeTab === category._id ? "font-bold" : ""
                }`}
                onClick={() => {
                  handleTabClick(category._id);
                  // Close the dropdown after clicking a category if needed
                  setShowCategories(false);
                }}
              >
                {`POPULAR IN ${category.name.toUpperCase()}`}
              </div>
            ))}
          </div>
        )}
      </div>

      {paginatedStores.length > 0 ? (
        <>
          <PopularProducts products={paginatedStores} activeTab={activeTab} />
          {filteredStores.length > 0 ? (
            <Pagination
              currentPage={currentPage}
              totalPages={Math.ceil(filteredStores.length / productsPerPage)}
              onPageChange={handlePageChange}
              maxVisiblePages={1}
            />
          ) : (
            <div className="flex justify-center shadow-md hover:shadow-lg border my-24  md:mx-48 mx-4 py-10 text-center px-2 md:px-0 font-bold text-lg">
              <p>No products are available for the selected category.</p>
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

export default AllPopularMerchantsGrid;
