"use client"
import AllPopularMerchants from "@/components/pages/homepage/popularMerchantsNearYou/AllPopularMerchants";
import React ,{useState} from "react";

export default function page({ searchParams }) {
  const searchcategoryName = searchParams.category;
  const searchcategoryId = searchParams.categoryId;

  return (
    <div>
        <AllPopularMerchants
          categoryName={searchcategoryName}
          categoryId={searchcategoryId}
        />
    </div>
  );
}
