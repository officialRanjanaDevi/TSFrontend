import React, { useEffect, useState } from "react";
import FiltersMenu from "../filterMenu/FiltersMenu";
import ProductCard from "./ProductCard";
import { getProducts } from "./getProducts";
import Image from "next/image";
import Link from "next/link";

const productList = getProducts();

const ExploreByCategories = () => {
  const [selectedFilters, setSelectedFilters] = useState(null);
  const [isFilterMenuOpen, setFilterMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(1);

  function toggleFilterMenu() {
    setFilterMenuOpen(!isFilterMenuOpen);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveImage((activeImage + 1) % 4);
    }, 1500);
    return () => clearInterval(timer);
  }, [activeImage]);

  const filteredProducts = productList;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 w-full gap-4 overflow-auto">
      {/* Filter Menu */}
      <div
        className={`${
          isFilterMenuOpen
            ? "translate-y-0 top-0"
            : "translate-y-[50%] right-full lg:right-0 lg:translate-y-0"
        } absolute lg:relative w-full lg:w-auto h-min bg-gray-100 pt-9 pb-4 transition-transform duration-[425ms] ease-in-out z-20`}
      >
        <div className="flex flex-row items-center justify-end w-full px-4">
          <div
            className="p-1 lg:hidden bg-black text-white rounded"
            onClick={toggleFilterMenu}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              className="bi bi-x"
              viewBox="0 0 16 16"
            >
              {" "}
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                fill="white"
              ></path>{" "}
            </svg>
          </div>
        </div>
        <FiltersMenu
          selectedFilters={selectedFilters}
          setSelectedFilters={setSelectedFilters}
        />
      </div>

      <div
        className={`col-span-1 md:col-span-4 ${
          isFilterMenuOpen ? "hidden" : "block"
        } w-full lg:w-auto py-4 lg:p-0 `}
      >
        {/* Filter button for mobile */}
        <div className={`block lg:hidden w-full px-5`}>
          <div className="flex flex-row justify-end items-center w-full">
            <div
              className="flex flex-row justify-center items-center gap-2.5 px-4 py-1 border border-black cursor-pointer"
              onClick={toggleFilterMenu}
            >
              <button>Filter</button>
              <Image
                src="/images/filtericon.svg"
                width={20}
                height={20}
                alt="filter icon"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-start mt-5 w-full">
          <div className="w-full">
            <h1 className="font-bold text-2xl px-4 lg:p-0">Category Heading</h1>
            <div className="flex lg:hidden mt-5 w-full pl-4 lg:p-0 overflow-hidden">
              <div className="relative w-[880px] ">
                <div
                  className={`flex flex-row items-center gap-4  md:gap-10 ${
                    activeImage === 0 ? "translate-x-0 duration-1000" : ""
                  } 
										${
                      activeImage === 1
                        ? "-translate-x-[220px] duration-500"
                        : activeImage === 2
                        ? "-translate-x-[440px] duration-500"
                        : activeImage === 3
                        ? "-translate-x-[440px] duration-500"
                        : ""
                    }`}
                >
                  <div
                    className={`w-[220px] flex-shrink-0 h-[120px]  bg-[url(/images/img_furniture.png)] rounded-lg `}
                  >
                    <div className="w-fulll h-full bg-black bg-opacity-50 shadow-lg rounded-lg"></div>
                  </div>
                  <div
                    className={`w-[220px] flex-shrink-0 h-[120px]  bg-[url(/images/img_jewellery.png)] rounded-lg`}
                  >
                    <div className="w-fulll h-full bg-black bg-opacity-50 shadow-lg rounded-lg"></div>
                  </div>
                  <div
                    className={`w-[220px] flex-shrink-0 h-[120px]  bg-[url(/images/img_electronic.png)] rounded-lg`}
                  >
                    <div className="w-fulll h-full bg-black bg-opacity-50 shadow-lg rounded-lg "></div>
                  </div>
                </div>

                <div className="absolute inset-y-0 left-[40px] flex items-center justify-center">
                  <div className="flex flex-col items-start gap-1 text-white">
                    <div className="font-semibold text-base">
                      Sale Upto 15% Off
                    </div>
                    <div className="flex text-black font-semibold items-center bg-gradient-to-b from-[#FAAC06] to-[#EB8105] rounded-lg px-2 py-1 text-base ">
                      Check Out
                      <div>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <g clip-path="url(#clip0_4893_5386)">
                            <path
                              d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_4893_5386">
                              <rect width="24" height="24" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Brand products grids */}
          <div className="flex flex-col gap-2 lg:gap-4 items-start w-full px-4 lg:p-0">
            <h2 className="font-semibold text-xl">Brand Heading</h2>
            <div className="overflow-auto w-full ">
              <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-4 lg:gap-8 w-full min-w-max">
                {filteredProducts.map((product, key) => (
                  <ProductCard key={key} productDetails={product} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:gap-4 items-start w-full px-4 lg:p-0">
            <h2 className="font-semibold text-xl">Brand Heading</h2>
            <div className="overflow-auto w-full ">
              <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-8 w-full min-w-max">
                {filteredProducts.map((product, key) => (
                  <ProductCard key={key} productDetails={product} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:gap-4 items-start w-full px-4 lg:p-0">
            <h2 className="font-semibold text-xl">Brand Heading</h2>
            <div className="overflow-auto w-full ">
              <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-8 w-full min-w-max">
                {filteredProducts.map((product, key) => (
                  <ProductCard key={key} productDetails={product} />
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 lg:gap-4 items-start w-full px-4 lg:p-0">
            <h2 className="font-semibold text-xl">Brand Heading</h2>
            <div className="overflow-auto w-full ">
              <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-8 w-full min-w-max">
                {filteredProducts.map((product, key) => (
                  <ProductCard key={key} productDetails={product} />
                ))}
              </div>
            </div>
          </div>

          {/* arrows up and down */}
          <div className="flex flex-col items-center w-full md:hidden">
            <div className="h-2">
              <svg
                width="24"
                height="21"
                viewBox="0 0 24 21"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_3350_1985)">
                  <path
                    d="M7 10.8733L12 5.87329L17 10.8733H7Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3350_1985">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 -3.12671)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="h-2">
              <svg
                width="24"
                height="22"
                viewBox="0 0 24 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_3350_1989)">
                  <path
                    d="M7 10.8733L12 15.8733L17 10.8733H7Z"
                    fill="#323232"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_3350_1989">
                    <rect
                      width="24"
                      height="24"
                      fill="white"
                      transform="translate(0 0.873291)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
          </div>

          {/* Add Business Card */}
          <div className="flex w-full items-center justify-center md:justify-start px-4 lg:p-0">
            <div className="flex flex-col md:flex-row md:justify-between items-center justify-center gap-2 border rounded-sm p-6 lg:w-2/3">
              <div className="flex flex-col md:flex-row items-center gap-2">
                <svg
                  width="32"
                  height="33"
                  viewBox="0 0 32 33"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M28.6316 4.48885H1.68421V0.93329H28.6316V4.48885ZM16.8421 21.3777C16.8421 23.4044 17.5663 25.5733 18.5263 27.6V29.3777H1.68421V18.7111H0V15.1555L1.68421 6.26662H28.6316L29.8105 12.4888C28.6316 11.92 27.4189 11.6 26.1053 11.6C21.0526 11.6 16.8421 16.0444 16.8421 21.3777ZM15.1579 18.7111H5.05263V25.8222H15.1579V18.7111ZM32 21.3777C32 26 26.1053 32.9333 26.1053 32.9333C26.1053 32.9333 20.2105 26 20.2105 21.3777C20.2105 18 22.9053 15.1555 26.1053 15.1555C29.3053 15.1555 32 18 32 21.3777ZM28.1263 21.5555C28.1263 20.4888 27.1158 19.4222 26.1053 19.4222C25.0947 19.4222 24.0842 20.3111 24.0842 21.5555C24.0842 22.6222 24.9263 23.6888 26.1053 23.6888C27.2842 23.6888 28.2947 22.6222 28.1263 21.5555Z"
                    fill="#7C7C7C"
                  />
                </svg>
                <div className="flex flex-col items-center justify-start gap-1">
                  <h3 className="w-2/3 md:w-full font-bold text-lg">
                    Can&apos;t find the Business
                  </h3>
                  <p className="w-2/3 md:w-full text-center md:text-left font-thin">
                    Adding a business to Trialshopy is always free.{" "}
                  </p>
                </div>
              </div>
              <Link target="_blank" href="https://seller.trialshopy.com">
                <button className="bg-black text-white px-4 py-1 rounded">
                  Add Business
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExploreByCategories;
