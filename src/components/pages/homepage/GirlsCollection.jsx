"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const GirlsCollection = () => {
  const [products, setProducts] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 4; // Number of products to display at once
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/clothing/getClothingByFilter`,
          {
            params: {
              category: "5f52b44a16c0f1e00c79b833",
            },
          }
        );

        // Filter out only the products belonging to the desired category
        const filteredProducts = response.data.filter(
          (product) => product.category === "5f52b44a16c0f1e00c79b833"
        );
        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [serverURL]);

  const router = useRouter();

  const handleOnClick = (categoryId) => {
    router.push(`/subcategory/${categoryId}`);
  };

  // Handle Left Click
  const handleLeftClick = () => {
    setStartIndex((prevIndex) => Math.max(prevIndex - visibleCount, 0));
  };

  // Handle Right Click
  const handleRightClick = () => {
    setStartIndex((prevIndex) =>
      Math.min(prevIndex + visibleCount, products.length - visibleCount)
    );
  };

  return (
    <div className="py-8 w-full overflow-x-auto pl-5 md:px-12 lg:px-[120px]">
      <div className="flex items-center justify-between text-xl font-bold text-left">
        <Link href={"/category/64cfdb45f6f996cacc4087ff"}>
          <h2 className="border-b-2 mb-5 border-red-700 inline-block">
            GIRLS COLLECTION
          </h2>
        </Link>

        {/* Left & Right Buttons */}
        <div className="flex flex-row items-center lg:hidden">
          <button onClick={handleLeftClick} disabled={startIndex === 0}>
            <img
              src="/images/chevronleft.svg"
              width={24}
              height={24}
              alt="Left"
              className={`w-[24px] h-[24px] ${
                startIndex === 0 ? "opacity-50 " : ""
              }`}
            />
          </button>
          <button
            onClick={handleRightClick}
            disabled={startIndex + visibleCount >= products.length}
          >
            <Image
              src="/images/chevron_right.svg"
              width={24}
              height={24}
              alt="Right"
              className={`w-[24px] h-[24px] ${
                startIndex + visibleCount >= products.length
                  ? "opacity-50 "
                  : ""
              }`}
            />
          </button>
        </div>
      </div>

      <div className="flex flex-col-2 md:flex-row justify-start w-full gap-4">
        {/* Girls Collection Section */}
        <div className="w-fit mt-4 md:block">
          <div className="flex flex-row items-center shrink-0">
            <div className="grid lg:grid-cols-2 w-24 md:w-44 lg:w-64">
              <div className="flex flex-col justify-end lg:pb-8">
                <Link href={"/category/64cfdb45f6f996cacc4087ff"}>
                  <div className="flex flex-row items-center justify-center px-[5px] py-[10px] rounded-[3px] bg-[#18181B] text-white w-[92px] lg:w-[124px] h-[27px] lg:h-[37px] z-10">
                    <p className="font-Nunito font-semibold text-center">
                      For Girls
                    </p>
                  </div>
                </Link>
              </div>
              <Image
                className="h-[150px] sm:h-[241px] w-full mt-2"
                width={220}
                height={190}
                src="/images/girlscollectiongirl.png"
                alt=""
              />
            </div>
          </div>
        </div>

        {/* Product cards container with grid and overflow */}
        <div className="flex flex-row gap-2 mt-[15%] md:mt-[6%] lg:mt-[4%] overflow-hidden grid-container">
          {products.slice(startIndex, startIndex + visibleCount).map((product) => (
            <div
              key={product._id}
              className=" flex flex-col items-center justify-evenly md:w-[200px] w-[160px]"
              onClick={() => handleOnClick(product.category)}
            >
                <img
                  className="sm:h-[140px] h-[100px] w-[100px] sm:w-[130px] md:h-[164px] md:w-[164px] 
                  rounded-full object-cover cursor-pointer"
                  width={200}
                  height={200}
                  src={product.image?.url || "/placeholder-image.jpg"}
                  alt={product.name}
                />
              <p className="text-center mt-0 sm:mt-2 text-sm sm:text-lg font-semibold sm:h-[140px] w-[100px] sm:w-[130px] md:w-[164px] ">
                {product.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GirlsCollection;
