// CategoryComponent.js

import React, { useState, useEffect } from "react";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import Link from "next/link";

function CategoryComponent({
  setDropdown,
  categories,
  setIsDroOpen,
  setSelectedSubCategory,
}) {
  const [nestedDropdowns, setNestedDropdowns] = useState(
    Array(categories.length).fill(false)
  );

  const handleNestedDropdownToggle = (index) => {
    setNestedDropdowns((prev) => {
      const updatedDropdowns = [...prev];
      updatedDropdowns[index] = !prev[index];
      return updatedDropdowns;
    });
  };

  useEffect(() => {
    setNestedDropdowns(Array(categories.length).fill(false));
  }, [categories]);

  return (
    <div className="w-full bg-white z-[100] absolute top-0 lg:px-[5rem] md:px-10 px-3 py-5 border shadow-lg">
      <div className="w-full text-center py-3">
        {categories
          .filter((category) => category && category.name)
          .map((category, index) => (
            <div className="dropdown-section" key={index}>
              <div
                className={`dropdown-title flex items-center justify-between cursor-pointer bg-white text-black px-2 ${
                  nestedDropdowns[index] ? "open" : ""
                }`}
                onClick={() => handleNestedDropdownToggle(index)}
              >
                <div className="flex flex-row items-center my-2 font-medium">
                  {category.name}
                </div>
                <span
                  className={`dropdown-icon ${
                    nestedDropdowns[index] ? "open" : ""
                  }`}
                >
                  {nestedDropdowns[index] ? (
                    <MdKeyboardArrowUp size={20} />
                  ) : (
                    <MdKeyboardArrowDown size={20} />
                  )}
                </span>
              </div>

              {nestedDropdowns[index] && (
                <div className="dropdown-content">
                  <div className="flex flex-col">
                    {category.children.map((subCat, subIndex) => (
                      <Link
                        href={`/subcategory/${subCat._id}`}
                        key={subIndex}
                        onClick={() => {
                          setSelectedSubCategory(subCat);
                          setIsDroOpen(false);
                        }}
                        className={`my-1 text-sm text-left pl-8 cursor-pointer ${
                          setSelectedSubCategory?._id === subCat._id
                            ? "text-[#FAAC06]"
                            : ""
                        }`}
                      >
                        {subCat.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default CategoryComponent;
