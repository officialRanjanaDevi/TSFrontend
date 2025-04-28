"use client"
import BrandDetailsPage from "@/components/pages/homepage/brandDeals/BrandDetailsPage";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import React,{useState} from "react";

export default function page({ params, searchParams }) {
  const searchcategoryName = searchParams.category;
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <div>
      <FilterMenuLayout selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}>
        <BrandDetailsPage
          categoryName={searchcategoryName}
          categoryId={params.id}
        />
      </FilterMenuLayout>
    </div>
  );
}
