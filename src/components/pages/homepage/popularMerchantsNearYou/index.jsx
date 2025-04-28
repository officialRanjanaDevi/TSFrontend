"use client";
import React, { useState, useEffect } from "react";
import ProductGrid from "./ProductGrid";
import { getProducts } from "./getProducts";
import axios, { all } from "axios";
import { useRouter } from "next/navigation";
// import { useUser } from '../../../UserContext';

const activeTabClass = "pb-2 font-bold border-b-2 border-black";

const PopularMerchant = () => {
  const [allstores, setAllStores] = useState([]);
  const [popular_fashion, setPopularFashion] = useState([]);
  const [popular_jewellery, setPopularJewellery] = useState([]);
  const [popular_electronics, setPopularElectronics] = useState([]);
  const [popular_furniture, setPopularFurniture] = useState([]);
  const [popularStores, setPopularStores] = useState([]); // Define popularStores state
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const router = useRouter();
  // const {user, token} = useUser();
  // let sellerId = "64ca8e852eb496c7f2bf4e50";

  useEffect(() => {
    categorizeStores(allstores);
  }, [allstores]);

  useEffect(() => {
    setProductList(popular_fashion);
  }, [popular_fashion]);

  useEffect(() => {
    setProductList(popular_jewellery);
  }, [popular_jewellery]);

  useEffect(() => {
    setProductList(popular_electronics);
  }, [popular_electronics]);

  useEffect(() => {
    setProductList(popular_furniture);
  }, [popular_furniture]);

  const categorizeStores = (stores) => {
    setPopularFashion([]);
    setPopularJewellery([]);
    setPopularElectronics([]);
    setPopularFurniture([]);

    let fashion_count = 0;
    let jewellery_count = 0;
    let electronics_count = 0;
    let furniture_count = 0;

    stores.forEach((item) => {
      const items = item.categories;
      for (const obj of items) {
        if (obj === "64b9002188cb61a80b5cf503") {
          if (fashion_count < 3) {
            setPopularFashion((prevFashion) => [...prevFashion, item]);
            fashion_count++;
          }
        } else if (obj === "658d19a4a2fd1710d0ea7fcc") {
          if (jewellery_count < 3) {
            setPopularJewellery((prevJewellery) => [...prevJewellery, item]);
            jewellery_count++;
          }
        } else if (obj === "658d19a4a2fd1710d0ea7fe3") {
          if (electronics_count < 3) {
            setPopularElectronics((prevElectronics) => [
              ...prevElectronics,
              item,
            ]);
            electronics_count++;
          }
        } else if (obj === "658d19a4a2fd1710d0ea7fdf") {
          if (furniture_count < 3) {
            setPopularFurniture((prevFurniture) => [...prevFurniture, item]);
            furniture_count++;
          }
        }
      }
    });
  };

  const [activeTab, setActiveTab] = useState("fashion");
  const [productList, setProductList] = useState(getProducts("fashion"));
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isFollowing, setIsFollowing] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/getAllMerchantPopular`
      );
     
      setPopularStores(response.data);
      
    } catch (error) {
      console.error("Error fetching popular stores:", error);
    }
  };

  const fetchCategories = async () => {
    if (sessionStorage.getItem("homeCategories")) {
      setCategories(JSON.parse(sessionStorage.getItem("homeCategories")));
    } else {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/homeCategories`
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
  };

  useEffect(() => {
    fetchData();
    fetchCategories();
  }, [serverURL]);

  const filteredStores = popularStores.filter((store) =>
    store.categories.includes(activeTab)
  );
  const handleTabClick = (categoryId, categoryName) => {
    setActiveTab(categoryId);
    setSelectedCategory(categoryName);
    router.push(
      "/PopularMerchant" +
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
    <>
      <div className="m-auto">
          <div className="text-xl flex justify-between font-bold text-left cursor-pointer">
            <h2 className="border-b-2 border-red-700 inline-block ">
              POPULAR MERCHANTS NEAR YOU
            </h2>
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
            {showCategories && (
            <div className="md:hidden font-medium text-lg absolute z-50 mt-[2rem] right-0 bg-white rounded-md shadow-lg">
              {categories
                .filter((category) => category && category.name)
                .map((category) => (
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
        {/* Menu bar on the left */}
     
        <div className=" flex flex-row justify-start gap-8 w-full">
          {/* Dropdown content for smaller screens */}
         


          <div className=" mt-1 sm:mt-6 md:flex-row lg:flex-row gap-7 flex lg:flex">
            <div className="w-60  hidden md:flex flex-col items-between justify-between pt-2 pb-16">
              {categories
                .filter((category) => category && category.name)
                .map((category) => (
                  <p
                    key={category._id}
                    className={`cursor-pointer mt-4  text-xl
                    ${
                      activeTab === category._id
                        ? "font-bold hover:font-bold underline decoration-[#ed8605] underline-offset-[5px] decoration-2"
                        : "hover:font-bold hover:underline hover:underline-decoration-[#ed8605] hover:underline-offset-[5px]"
                    }`}
                    onClick={() => handleTabClick(category._id, category.name)}
                  >
                    {`Popular in ${category.name}`}
                  </p>
                ))}
            </div>
            
          <div className=" mt-1 sm:mt-6 lg:m-4 overflow-x-scroll w-[95vw] md:w-[70vw] grid-container">
            <ProductGrid products={popularStores} />
          </div>
         
          </div>
          

        </div>
      </div>
    </>
  );
};

export default PopularMerchant;
