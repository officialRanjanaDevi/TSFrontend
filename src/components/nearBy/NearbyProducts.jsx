"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ProductCard from "../productCards/ProductCard";

const NearbyProducts = ({ selectedFilters }) => {
  const { id } = useParams();
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [data, setData] = useState({});

  useEffect(() => {
    if (id) {
      const api = `${serverURL}/api/v1/categoryProducts/${id}`;
      axios
        .get(api)
        .then((res) => {
          setData(res.data);
          console.log(res.data,"here")
        })
        .catch((err) => console.error("Error fetching products:", err));
    }
  }, [id, serverURL]);


  const applyFilters = (products) => {
    let filteredProducts = [...products];

    if (selectedFilters?.storeId) {
      filteredProducts = filteredProducts.filter(
        (product) => product?.storeId?._id === selectedFilters.storeId
      );
    }

    if (selectedFilters?.minPrice && selectedFilters?.maxPrice) {
      filteredProducts = filteredProducts.filter((product) => {
        const prices = [
          product?.Size?.XL?.trialshopyPrice,
          product?.Size?.M?.trialshopyPrice,
          product?.Size?.["free size"]?.trialshopyPrice,
        ].filter(Boolean); 
        return prices.some(
          (price) => price >= selectedFilters.minPrice && price <= selectedFilters.maxPrice
        );
      });
    }
    if (selectedFilters?.category) {
      filteredProducts = filteredProducts.filter((product) => {
        return Array.isArray(product.categories) && product.categories.includes(selectedFilters.category);
      });
    }
    return filteredProducts;
  };

  return (
    <div>
      {Object.entries(data).map(([categoryName, products]) => {
        const filteredProducts = applyFilters(products); 

        return (
          <div key={categoryName} className={`p-4 ${filteredProducts.length <= 0 ? "hidden" : "flex flex-col"}`}>
            <h2 className="font-bold mt-4">{categoryName}</h2>
            {filteredProducts.length > 0 ? (
              <ul className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredProducts.map((product, index) => (
                  <ProductCard key={index} productDetails={product} />
                ))}
              </ul>
            ) : (
              <p>No products available.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default NearbyProducts;
