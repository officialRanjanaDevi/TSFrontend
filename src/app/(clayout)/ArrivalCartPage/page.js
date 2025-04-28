"use client"
import ArrivalCart from "@/components/header/arrival/ArrivalCart";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";
import React,{useState} from "react";

export default function ArrivalCartPage({ searchParams }) {
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
        <ArrivalCart
           selectedFilters={selectedFilters}
          categoryName={searchcategoryName}
          categoryId={searchcategoryId}
        />
      </FilterMenuLayout>
    </div>
  );
}
