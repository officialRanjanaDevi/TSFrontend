"use client";
import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import BrandGrid1 from "./BrandGrid1";
import ProductCard from "@/components/productCards/ProductCard"; // Import ProductCard component
import SkeletonLoader from "@/components/productCards/SkeletonLoader";
import { UserContext } from "@/lib/UserContext";
const BrandDetailsPage = ({ categoryName, categoryId }) => {
  const [data, setData] = useState([]);
  const [productDetails, setProductDetails] = useState([]);
  const [brandsToShow, setBrandsToShow] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const router = useRouter();
  const [authenticated, setAuthenticated] = useContext(UserContext);

  useEffect(() => {
    const fetchPopularBrands = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/getPopularBrand`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching popular brands:", error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`${serverURL}/api/v1/products`);
        setProductDetails(response.data);
        setLoading(false); // Set loading to false after fetching data
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchPopularBrands();
    fetchProductDetails();
  }, [serverURL]);

  useEffect(() => {
    if (categoryId) {
      const brands = data.filter((brand) =>
        brand.categories.includes(categoryId)
      );
      setBrandsToShow(brands);
    }
  }, [data, categoryId]);

  const isFavourite = (productId) => {
    return (
      authenticated.user.wishList &&
      authenticated.user.wishList.includes(productId)
    );
  };

  const handleFavouriteClick = (productId) => {
    const isCurrentlyFavourite = isFavourite(productId);
    const updatedWishList = isCurrentlyFavourite
      ? authenticated.user.wishList.filter((id) => id !== productId)
      : [...authenticated.user.wishList, productId];

    const api = isCurrentlyFavourite
      ? `${serverURL}/api/v1/deleteWishList/${authenticated.user._id}/${productId}`
      : `${serverURL}/api/v1/addWishList/${authenticated.user._id}/${productId}`;

    axios[isCurrentlyFavourite ? "delete" : "post"](api)
      .then((res) => {
        setAuthenticated({ user: res.data });
        console.log("Wishlist updated:", res.data);
      })
      .catch((err) => console.error("Error updating wishlist:", err));
  };

  return (
    <>
      <div>
        <div className="ml-2 sm:hidden"></div>
        <div className="">
          <h1 className="text-xl mt-4 font-semibold text-[28px]">
            Popular Brand
          </h1>
          <h1 className="font-poppins mt-2 underline decoration-[#ed8605] underline-offset-[5px] decoration-2 lg:text-[16px] text-[14px] font-fontMedium w-full ml-3 lg:ml-0">
            Brand For {categoryName}
          </h1>
        </div>
      </div>

      <div className="w-full  mt-4 overflow-auto lg:mt-4 grid-container">
        <BrandGrid1 products={brandsToShow} />
      </div>

      {brandsToShow.map((brand, index) => (
        <div key={index} className="items-center md:h-ful mt-4">
          <div className="text-lg ml-2">{brand.name}</div>
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
              {Array.from(Array(brand.products.length).keys()).map((index) => (
                <SkeletonLoader key={index} width={200} height={200} />
              ))}
            </div>
          ) : (
            <div className="flex gap-4 ml-2 w-full overflow-auto grid-container ">
              {brand.products && brand.products.length > 0 && (
                <div className="flex md:gap-5 gap-4">
                  {productDetails
                    .filter((product) => brand.products.includes(product._id))
                    .map((product, productIndex) => (
                      <ProductCard
                        key={productIndex}
                        productDetails={product}
                        defaultImage={{ url: "/path/to/default/image" }}
                      />
                    ))}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default BrandDetailsPage;
