"use client"
import AllPopularMerchants from "@/components/pages/homepage/popularMerchantsNearYou/AllPopularMerchants";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import React ,{useState} from "react";

export default function page({ searchParams }) {
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
      <FilterMenuLayout selectedFilters={selectedFilters} setSelectedFilters={setSelectedFilters}>
        <AllPopularMerchants
          categoryName={searchcategoryName}
          categoryId={searchcategoryId}
        />
      </FilterMenuLayout>
    </div>
  );
}
