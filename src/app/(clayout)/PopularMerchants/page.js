"use client"
import AllPopularMerchantsGrid from "@/components/pages/homepage/popularMerchantsNearYou/AllPopularMerchantsGrid";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import React ,{useState} from "react";

export default function page() {
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <div>
      <FilterMenuLayout selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}>
        <AllPopularMerchantsGrid />
      </FilterMenuLayout>
    </div>
  );
}
