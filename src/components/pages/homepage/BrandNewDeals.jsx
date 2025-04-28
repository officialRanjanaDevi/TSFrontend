"use client";
import React, { useState, useEffect } from "react";
import BrandGrid from "./BrandGrid";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";

const activeTabClass = "pb-2 font-bold border-b-2 border-black";

const BrandNewDeals = () => {
  const [allstores, setAllStores] = useState([]);
  const [data, setData] = useState([]);
  let sellerId = "64ca8e852eb496c7f2bf4e50";
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const router = useRouter();
  const [showCategories, setShowCategories] = useState(false);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    // Fetch data from the API
    axios
      .post(`${serverURL}/api/v1/${sellerId}/stores`)
      .then((response) => {
        setAllStores(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching stores:", error);
      });

    axios
      .get(`${serverURL}/api/v1/getPopularBrand`)
      .then((response) => {
        setData(response.data);
        // console.log("Brand deals:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching brand deals:", error);
      });
    const fetchCategories = async () => {
      const api = `${serverURL}/api/v1/homeCategories`;
      try {
        const response = await axios.get(api);
        //console.log('Response Data:', response.data); // Log entire response data
        const allCategories = response.data.reduce((acc, category) => {
          if (category.children) {
            return acc.concat(category.children);
          }
          return acc;
        }, []);
        setCategories(allCategories);
        //console.log('All Categories Data:', allCategories); // Log all categories data
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [sellerId, serverURL]);

  const [activeTab, setActiveTab] = useState("fashion");

  const getFilteredProducts = () => {
    switch (activeTab) {
      case "fashion":
        return data;
      case "Popular Brands For Man's":
        return data.filter((item) => item.name === "Nike");
      case "Popular Brands For Woman's":
        return data.filter((item) => item.name === "Adidas");
      default:
        console.log("Unknown Tab");
        return [];
    }
  };

  const filteredProducts = getFilteredProducts();

  const handleTabClick = (categoryId, categoryName) => {
    setActiveTab(categoryId);
    setSelectedCategory(categoryName);
    router.push(
      "/brand-deals/BrandDetailsPages" +
        "?" +
        "category" +
        "=" +
        categoryName +
        "&" +
        "categoryId" +
        "=" +
        categoryId
    );
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <div className="m-auto">
      <Link href={"/brand-deals/brand-deals"} className="">
        <h2 className="inline-block text-xl font-bold text-left border-b-2 border-red-700 md:mb-3">
          BRAND DEALS
        </h2>
      </Link>

      <div className="flex flex-row justify-start w-full md:gap-4">
        <div>
          <div className="hidden md:flex">
            <div className="items-center mt-4 md:flex-row lg:flex-row gap-7">
              <Link href={"/brand-deals/brand-deals"} className="">
                <p
                  className={`cursor-pointer inline-block border-none  
                    hover:font-bold hover:underline hover:underline-decoration-[#ed8605] hover:underline-offset-[5px] ${
                      activeTab === "fashion" ? "" : ""
                    }`}
                >
                  Popular Brands
                </p>
              </Link>

              {categories.map((category, index) => {
                const matchedBrand = data.find((brand) =>
                  brand.categories.includes(category._id)
                );
                if (matchedBrand) {
                  return (
                    <>
                      {/* <Slider {...settings}> */}
                      <h1
                        key={index}
                        className={`cursor-pointer mt-4
                    ${
                      activeTab === category._id
                        ? "font-bold hover:font-bold underline decoration-[#ed8605] underline-offset-[5px] decoration-2"
                        : "hover:font-bold hover:underline hover:underline-decoration-[#ed8605] hover:underline-offset-[5px]"
                    }`}
                        onClick={() =>
                          handleTabClick(category._id, category.name)
                        }
                      >
                        Brands for {category.name}
                      </h1>
                      {/* </Slider> */}
                    </>
                  );
                }
                return null;
              })}
            </div>
          </div>
        </div>

        <div className="w-full mt-2 mb-2 overflow-auto md:mt-4 lg:m-0 grid-container">
          {/* Menu bar on the left */}
          <div className="cursor-pointer md:hidden" onClick={toggleCategories}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
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
          {/* Dropdown content for smaller screens */}
          {showCategories && (
            <div className="md:hidden absolute z-50 mt-[1rem] bg-white p-4 rounded-md shadow-lg">
              <div>
                {categories.map((category, index) => {
                  const matchedBrand = data.find((brand) =>
                    brand.categories.includes(category._id)
                  );
                  if (matchedBrand) {
                    return (
                      <>
                        {/* <Slider {...settings}> */}
                        <div
                          key={index}
                          onClick={() => {
                            // Close the dropdown after clicking a category if needed
                            setShowCategories(false);
                            setActiveTab(category._id);
                            handleTabClick(category._id, category.name);
                          }}
                          className={`cursor-pointer ${
                            activeTab === category._id
                              ? "font-bold hover:font-bold hover:text-[18px] text-[18px] underline decoration-[#ed8605] underline-offset-[5px] decoration-2"
                              : " hover:font-bold text-[18px]"
                          }`}
                        >
                          Brands for {category.name}
                        </div>
                        {/* </Slider> */}
                      </>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          )}

          <BrandGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default BrandNewDeals;
