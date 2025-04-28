import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Image from "next/image";
import EmptyStoreOffers from "./EmptyStoreOffers";
import Link from "next/link";

const StoreOffers = ({ storeId }) => {
  const [offers, setOffers] = useState([]);
  const [products, setProducts] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/offer/getAllOffers`
        );
        setOffers(response.data);
        console.log("Fetched Offers:", response.data);
      } catch (error) {
        console.error("Error fetching offers:", error);
      }
    };

    fetchOffers();
  }, [serverURL, storeId]);

  // Define fetchProducts wrapped in useCallback
  const fetchProducts = useCallback(
    async (productIds) => {
      try {
        const uniqueProductIds = [...new Set(productIds)]; // Remove duplicates
        const productsResponse = await Promise.all(
          uniqueProductIds.map((productId) =>
            axios.get(`${serverURL}/api/v1/products/${productId}`)
          )
        );
        console.log("Unique Product IDs:", uniqueProductIds);

        const fetchedProducts = productsResponse.map(
          (response) => response.data
        );

        const filteredProducts = fetchedProducts.filter((product) => {
          const productStoreId = product.storeId._id; // Adjust this based on your data structure
          console.log("Product Store ID:", productStoreId);
          console.log("Component Store ID:", storeId);
          return productStoreId === storeId;
        });

        setProducts(filteredProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
    [serverURL, storeId]
  );

  useEffect(() => {
    const productIds = offers.reduce(
      (ids, offer) => [...ids, ...offer.applicableProducts],
      []
    );
    if (productIds.length > 0) {
      fetchProducts(productIds);
    }
  }, [offers, serverURL, storeId, fetchProducts]);
  // console.log(products,"here it is")
  const Column = ({ title, description, validFrom, validUntil, discount, applicableProducts }) => (
    <div className="py-1">
      <div className="px-2">
        {applicableProducts.map((productId, index) => {
          const product = products.find((p) => p._id === productId);

          return (
            product && (
              <Link href={`/products/details?productId=${productId}`}>
                <div
                  key={productId}
                  className={`block relative flex rounded py-2 hover:border-blue-700 shadow-md border-[2px] overflow-hidden ${index > 0 ? "mt-4" : ""
                    }`}
                >
                  <div className="flex flex-col w-full lg:bg-white lg:py-2 px-4">
                    <p className="text-[18px] font-semibold">{title} upto {discount}% discount</p>
                  
                    <p className="text-[#7C7C7C] text-[10px] mt-2 lg:text-[16px] justify-start">
                      {description}
                    </p>
                    <p className="text-[#7C7C7C] text-[15px] py-1">
                     Offer period is from  <span className="text-neutral-700">{new Date(validFrom).toLocaleDateString()} </span>to <span className="text-neutral-700">{new Date(validUntil).toLocaleDateString()}</span>                   </p>

                  </div>
                  <div className="w-2/5 px-2 sm:w-1/5 lg:w-fit">
                    <div className="relative block overflow-hidden rounded-lg">
                      <img
                        width={200}
                        height={200}
                        alt="ecommerce"
                        className="mx-1 lg:h-[20vh] lg:w-[20vh] w-5/6 h-5/6 rounded-[2rem]"
                        src={product?.productImage}
                      />
                    </div>
                  </div>
                </div>
              </Link>
            )
          );
        })}
      </div>
    </div>
  );
  console.log(offers)

  return (
    <div className="w-full">
      <div className="m-4 text-[18px] font-semibold">
        Offers
        {/* ({offers.length}) */}
      </div>
      <div>
        {products.length > 0 ? (
          offers.map((offer) => <Column key={offer._id} {...offer} />)
        ) : (
          <EmptyStoreOffers />
        )}
      </div>
    </div>
  );
};

export default StoreOffers;
