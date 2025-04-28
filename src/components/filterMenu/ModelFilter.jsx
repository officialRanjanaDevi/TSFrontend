import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

const ModelFilter = ({ setSelectedFilters }) => {
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedStore, setSelectedStore] = useState("");

  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  const handleFilterMenuOpen = () => {
    setFilterMenuOpen(!filterMenuOpen);
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/getAllMerchantPopular`);
        setBrands(response.data);
      } catch (error) {
        console.error("Error fetching popular stores:", error);
      }
    };

    if (brands.length === 0) {
      fetchStores();
    }
  }, [serverURL]);
  const handleSelect=(id)=>{
    if(selectedStore===id){
      setSelectedStore();  
      setSelectedFilters((prevFilters) => ({
        ...prevFilters, 
        storeId:"",  
      }));
    }else{
      setSelectedStore(id);  
      setSelectedFilters((prevFilters) => ({
        ...prevFilters, 
        storeId: id 
      }));
    }
  
  }
  return (
    <div className="flex flex-col items-center py-2 gap-2 w-full pb-8 border-b-2 border-gray-300">
      <div className="flex flex-row justify-between w-full">
        <h4 className="font-bold">Stores</h4>
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
        <div className="flex flex-col items-start gap-2.5 w-full text-md lg:text-sm h-[200px] overflow-auto">
          {brands.slice(0, 5).map((brand, brandIndex) => (
            <div
              key={brandIndex}
              onClick={() => handleSelect(brand._id)         }
              className={`flex h-8 truncate w-full capitalize cursor-pointer px-2 
                ${selectedStore === brand._id ? "border-2 border-gray-700 rounded" : ""}`}
            >
              <p className="truncate">{brand.storeName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModelFilter;
