"use client"
import StoreCategoryProducts from "@/components/nearBy/StoreCategoryProducts";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import { useState } from "react";
export default function NearByStorePage({ searchParams }) {
  const search = searchParams.storeId;
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <div className="">
      
      <FilterMenuLayout selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}>
      <StoreCategoryProducts selectedFilters={selectedFilters} />

      </FilterMenuLayout>
    </div>
  );
}
