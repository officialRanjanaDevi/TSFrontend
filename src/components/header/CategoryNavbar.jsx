"use client";
import React, { useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import CategoryComponent from "./headerComponents/CategoryComponent";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DropDownComp from "./headerComponents/DropDownComp";

const CategoryNavbar = ({ categories }) => {
  //console.log('categories', categories);
  const { pathname } = useRouter();
  const [selectedRoute, setselectedRoute] = useState("");
  const [isDroOpen, setIsDroOpen] = useState(false);
  const [dropdown, setDropdown] = useState(null);
  const [category, setCategory] = useState(null);

  const handleDropComponent = (key) => {
    if (!key) return;
    if (dropdown === key.name.toLowerCase()) {
      setIsDroOpen(false);
      setDropdown(null);
      return;
    }

    setDropdown(key.name.toLowerCase());
    setCategory(key);
    setIsDroOpen(true);
  };

  const mouseInDropComponent = (key) => {
    if (!key) return;
    setDropdown(key.name.toLowerCase());
    setCategory(key);
    setIsDroOpen(true);
  };

  const mouseOutDropComponent = () => {
    setDropdown(null);
    setCategory(null);
    setIsDroOpen(false);
  };

  useEffect(() => {
    if (pathname === "/") setselectedRoute("");
    else if (pathname === "/categories") setselectedRoute("categories");
    else if (pathname === "/nearByStore") setselectedRoute("nearByStore");

    setDropdown(null);
    setIsDroOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="flex flex-col w-full">
        <div className="bg-gray-800 relative px-4 xl:px-[100px] flex items-center justify-between h-full w-full text-white">
          <div className="lg:whitespace-nowrap xl:ml-9 flex-row h-full items-center justify-start text-center hidden gap-4 lg:flex font-poppins ">
            {categories
              .filter((category) => category && category.name)
              .map((category) => (
                <div
                  key={category._id}
                  className="h-full flex flex-col items-center justify-center py-4"
                  onMouseLeave={mouseOutDropComponent}
                >
                  <div
                    className="flex items-center justify-start  text-white uppercase duration-200 cursor-pointer"
                    onClick={() => handleDropComponent(category)}
                    onMouseEnter={() => mouseInDropComponent(category)}
                  >
                    <p className=" lg:text-xs xl:text-sm  xl:whitespace-nowrap ">
                      {category.name}
                    </p>
                    <MdOutlineKeyboardArrowDown
                      size={19}
                      className={
                        dropdown === category.name?.toLowerCase()
                          ? "text-[#FAAC06] transition-all duration-200 rotate-180"
                          : "text-[#FAAC06] duration-200 "
                      }
                    />
                  </div>
                </div>
              ))}
          </div>
          <div className="lg:text-xs xl:text-sm  flex flex-row gap-4 w-full lg:w-auto justify-between items-center h-full xl:whitespace-nowrap">
            <Link
              href="/nearByStore"
              className={
                selectedRoute === "nearByStore"
                  ? "text-secondary uppercase"
                  : "" +
                    "flex items-center justify-start gap-1 text-white uppercase duration-200 cursor-pointer py-4 h-full hover:underline"
              }
            >
              Nearby Stores
            </Link>

            <div
              className="flex items-center justify-start gap-1 text-white uppercase duration-200 cursor-pointer lg:hidden"
              onClick={() => handleDropComponent({ name: "category" })}
            >
              <p>Categories</p>
              <MdOutlineKeyboardArrowDown
                size={19}
                className={
                  dropdown === "category"
                    ? "text-[#FAAC06] transition-all duration-200 rotate-180"
                    : "text-[#FAAC06] "
                }
              />
            </div>
            <Link href="/liveproduct">
              <button className=" bg-red-800 text-white flex font-bold p-2">
                LIVE
                <span className="hidden  md:flex ml-1">PRODUCT</span>
              </button>
            </Link>
          </div>
        </div>

        <div
          className="relative w-full bg-white"
          onMouseEnter={() => mouseInDropComponent(category)}
          onMouseLeave={mouseOutDropComponent}
        >
          {isDroOpen && dropdown ? (
            dropdown === "category" ? (
              <CategoryComponent
                className="border-4"
                setDropdown={setDropdown}
                setIsDroOpen={setIsDroOpen}
                categories={categories}
              />
            ) : (
              <DropDownComp category={category} setIsDroOpen={setIsDroOpen} />
            )
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CategoryNavbar;
