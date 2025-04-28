"use client"
import NearbyProducts from "@/components/nearBy/NearbyProducts";
import { useState } from "react";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";

export default function nearByStore() {
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <FilterMenuLayout selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}>
      <NearbyProducts selectedFilters={selectedFilters} />
    </FilterMenuLayout>
  );
}
