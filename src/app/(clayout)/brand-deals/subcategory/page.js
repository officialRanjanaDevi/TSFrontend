"use client"
import CategoryProducts from "@/components/pages/homepage/brandDeals/CategoryProducts";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import React ,{useState} from "react";

export default function page({ searchParams }) {
  const searchcategoryId = searchParams.brandId;
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <div>
      <FilterMenuLayout selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}>
        <CategoryProducts brandId={searchcategoryId} />
      </FilterMenuLayout>
    </div>
  );
}
