import React, { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

const SubcategoriesFilter = ({ setSelectedFilters }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [brandMenuOpen, setBrandMenuOpen] = useState({});
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  // Toggle filter menu
  const handleFilterMenuOpen = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  // Toggle category dropdown
  const handleBrandMenuOpen = (index) => {
    setBrandMenuOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  // Fetch categories from API
  useEffect(() => {
    if (sessionStorage.getItem("homeCategories")) {
      setCategoriesData(JSON.parse(sessionStorage.getItem("homeCategories")));
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(`${serverURL}/api/v1/homeCategories`);
          setCategoriesData(response.data);
          sessionStorage.setItem("homeCategories", JSON.stringify(response.data));
        } catch (error) {
          console.error("Error fetching categories:", error);
        }
      };
      fetchData();
    }
  }, [serverURL]);
const handleSelect=(id)=>{
  if(selectedCategory===id){
    setSelectedCategory();
    setSelectedFilters((prevFilters) => ({
      ...prevFilters, 
      category:"",  
      }));
  }else{
    setSelectedCategory(id);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters, 
      category:id,  
      }));
  }

}


  return (
    <div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
      <div className="flex flex-row justify-between w-full">
        <h4 className="font-bold">Subcategories</h4>
        <Image
          className={`transform duration-200 ${filterMenuOpen ? "rotate-90" : ""}`}
          onClick={handleFilterMenuOpen}
          src="/images/keyboard_arrow_down.svg"
          width={20}
          height={20}
          alt="SVG map icon"
        />
      </div>
      <div className={`flex flex-col items-start justify-start w-full gap-2 ${filterMenuOpen ? "" : "hidden"}`}>
        <div className="flex flex-row items-center justify-between w-full">
          <div className="flex flex-col items-start gap-2.5 w-full max-h-[800px] text-md lg:text-sm">
            {categoriesData.map((category, index) => (
              <div key={index} className="w-full">
                <div className="flex flex-row justify-between w-full pl-2.5" onClick={() => handleBrandMenuOpen(index)}>
                  <p>{category.name}</p>
                  <Image src="/images/keyboard_arrow_down.svg" width={20} height={20} alt="SVG map icon" />
                </div>
                {brandMenuOpen[index] && category.children?.length > 0 && (
                  <div className="flex flex-col cursor-pointer gap-2 w-full pl-2">
                    {category.children.slice(0, 5).map((subCat, productIndex) => (
                      <div
                        key={productIndex}
                        onClick={() => handleSelect(subCat._id)}
                        className={`flex flex-row justify-between w-full pl-5 cursor-pointer
                          ${selectedCategory === subCat._id ? "border-2 border-gray-700 rounded" : ""}`}
                      >
                        <p>{subCat.name}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubcategoriesFilter;
