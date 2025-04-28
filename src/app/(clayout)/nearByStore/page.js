"use client"
import NearByStore from "@/components/nearBy/NearByStore";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import { useState } from "react";
export default function nearByStore() {
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <FilterMenuLayout setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters}>
      <NearByStore />
    </FilterMenuLayout>
  );
}
