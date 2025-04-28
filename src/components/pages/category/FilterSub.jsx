"use client";
import React, { useState } from "react";
import SubCategory from "@/components/pages/category/SubCategory";
import FilterMenuLayout from "@/layouts/FilterMenuLayout";

const FilterSub = ({ data, CategoryProductsId }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    minPrice:100,
    maxPrice:1000,
    category:"",
    storeId:""
  });
  return (
    <FilterMenuLayout
      data={data}
      selectedFilters={selectedFilters}
      setSelectedFilters={setSelectedFilters}
    >
      <SubCategory
        data={data}
        CategoryProductsId={CategoryProductsId}
        selectedFilters={selectedFilters}
      />
    </FilterMenuLayout>
  );
};

export default FilterSub;
