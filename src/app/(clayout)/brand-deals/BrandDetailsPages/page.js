"use client"
import BrandDetailsPage from "@/components/pages/homepage/brandDeals/BrandDetailsPage";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import React,{useState} from "react";

export default function BrandDetailsPages({ searchParams }) {
  const searchcategoryName = searchParams.category;
  const searchcategoryId = searchParams.categoryId;
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <div>
      <FilterMenuLayout setSelectedFilters={setSelectedFilters} selectedFilters={selectedFilters}>
        <BrandDetailsPage
          categoryName={searchcategoryName}
          categoryId={searchcategoryId}
        />
      </FilterMenuLayout>
    </div>
  );
}
