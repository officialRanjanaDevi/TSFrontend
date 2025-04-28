"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CircularCardGrid from "../productCards/CircularCardGrid";
import ProductCard from "../productCards/ProductCard";
import Link from "next/link";

const NearByGen = ({ data, id }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [categories, setCategories] = useState(null);
  const [products, setProducts] = useState({});
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  // Fetch user location from local storage
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    }
  }, []);

  // Fetch categories either from sessionStorage or API
  useEffect(() => {
    if (sessionStorage.getItem("homeCategories")) {
      const data = JSON.parse(sessionStorage.getItem("homeCategories"));
      const filteredData = data.filter((item) => item._id === id);
      console.log("filteredData from nearbygen.jsx", filteredData);
      setCategories(filteredData[0]);
    } else {
      const api = `${serverURL}/api/v1/homeCategories`;
      axios
        .get(api)
        .then((response) => {
          sessionStorage.setItem(
            "homeCategories",
            JSON.stringify(response.data)
          );
          const filteredData = response.data.filter((item) => item._id === id);
          setCategories(filteredData[0]);
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, [id, serverURL]);

  // Fetch products dynamically for each child category
  useEffect(() => {
    const fetchProductsForCategories = async () => {
      if (categories && categories.children) {
        const productsData = {};
        const promises = categories.children.map((category) => {
          const api = `${serverURL}/api/v1/products?limit=10`;
          return axios
            .post(api, {
              filters: {
                categories: [category._id],
              },
            })
            .then((response) => {
              console.log(
                `Products data for category ${category.name}:`,
                response.data
              );
              productsData[category.name] = response.data.data || [];
            })
            .catch((error) => {
              console.error(
                `Error fetching products for category ${category.name}:`,
                error
              );
            });
        });

        // Wait for all promises to resolve
        await Promise.all(promises);
        console.log("Final products data:", productsData);
        setProducts(productsData);
      }
    };

    fetchProductsForCategories();
  }, [categories, serverURL]);

  return (
    <>
      <div className="">
        <div className="ml-2 sm:hidden ">{/* <Checkoutcat /> */}</div>
        {categories && (
          <CircularCardGrid
            title={categories.name}
            cards={categories.children}
          />
        )}

        {Object.keys(products).length > 0 && categories ? (
          Object.keys(products).map((category) => {
            return (
              <div key={category}>
                <div className="flex px-4 font-poppins">
                  <span className="mr-auto md:text-[20px] text-[16px] w-[80vw] font-medium  ">
                    {category}
                  </span>
                  {categories.children.length > 0 && (
                    <Link
                      href={`/subcategory/${
                        categories.children.find(
                          (subCategory) => subCategory.name === category
                        )?._id
                      }`}
                      key={category}
                    >
                      <div className="justify-end text-[14px] md:hidden ml-auto w-[15vw] text-black">
                        See All
                      </div>
                    </Link>
                  )}
                </div>

                <div className="flex flex-row px-4 mb-2 overflow-x-auto grid-container ">
                  <div className="flex flex-row gap-4 py-4">
                    {products[category].length > 0 &&
                      products[category].map((item) => {
                        return (
                          <ProductCard
                            productDetails={item}
                            defaultImage={categories.image}
                            key={item._id}
                          />
                        );
                      })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <p>NO STORES NEARBY</p>
        )}
      </div>
    </>
  );
};

export default NearByGen;
