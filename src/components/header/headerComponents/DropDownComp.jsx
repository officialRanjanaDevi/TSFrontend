import { IoMdArrowDropright } from "react-icons/io";
import { useState, useEffect } from "react";
import SubCatCol from "./SubCatCol";
import Image from "next/image";

const DropDownComp = ({ category, setIsDroOpen }) => {
  const [selectedSubCat, setSelectedSubCat] = useState(
    category.children && category.children.length > 0
      ? { ...category.children[0] }
      : {}
  );

  useEffect(() => {
    if (category.children && category.children.length > 0) {
      setSelectedSubCat(category.children[0]);
    }
  }, [category]);

  const handleSubCatClick = (category) => {
    setSelectedSubCat(category);
    // setIsDroOpen(false);
  };

  return (
    <div className="w-full bg-white z-[80] absolute top-0 grid lg:grid-cols-5 grid-cols-2 grid-rows-3 lg:grid-rows-1 gap-4 lg:px-[5rem] md:px-10 px-3 py-5 border rounded shadow-lg">
      <div className="flex flex-col border-r">
        {category.children?.map((subCat) => (
          <div
            key={subCat._id}
            className={`${
              selectedSubCat._id === subCat._id
                ? "font-medium flex flex-row items-center"
                : "text-gray-600 cursor-pointer"
            } my-1`}
            onClick={() => handleSubCatClick(subCat)}
          >
            {subCat.name}
            {selectedSubCat._id === subCat._id && (
              <IoMdArrowDropright className="mx-1" size={16} />
            )}
          </div>
        ))}
      </div>

      {selectedSubCat.children && selectedSubCat.children?.length > 0
        ? selectedSubCat.children.map((sub1) => (
            <SubCatCol
              category={sub1}
              setIsDroOpen={setIsDroOpen}
              key={sub1._id}
            />
          ))
        : null}

      {/* Display dynamic data from the selected category */}
      <div className="flex flex-row items-center justify-center w-full col-span-2 rounded md:col-span-1">
        <div className="flex flex-col items-start">
          <div className="flex gap-1 text-sm font-light">
            Sponsored Results
            <img
              src={category.image?.url}
              width={16}
              height={16}
              alt=""
              className="opacity-50"
            />
          </div>
          <div className="flex flex-col items-center h-full gap-2 p-2 shadow-md w-fit hover:shadow-lg shrink-0">
            <div className="w-full h-48 rounded">
              <img
                width={100}
                height={100}
                src={selectedSubCat.image?.url}
                alt="card"
                className="object-cover w-full h-full rounded"
              />
            </div>

            <div className="flex flex-col self-start">
              <div className="font-medium">{selectedSubCat.name}</div>
              <div className="text-gray-500">{selectedSubCat.description}</div>
              <div className="flex flex-row">
                <div className="mr-2 font-medium">
                  {/* Add dynamic pricing here */}
                </div>
                {/* Add other dynamic content here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropDownComp;
