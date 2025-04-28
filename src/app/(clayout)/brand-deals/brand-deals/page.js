"use client"
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import React,{useState} from "react";

export default function page() {
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <div>
      <FilterMenuLayout setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters}>
        {/* <AllBrandDetailsPage /> */}
      </FilterMenuLayout>
    </div>
  );
}
