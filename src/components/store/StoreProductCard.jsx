import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const StoreProductCard = ({ product }) => {
  const { productName, shortDescription, Size = {}} = product;
  const [selectedSize, setSelectedSize] = useState();
  const price = product.Size?.M?.MRP || product.Size?.["free size"]?.MRP;
  const discountedPrice=product.Size?.M?.trialshopyPrice || product.Size?.["free size"]?.trialshopyPrice;

  const discount = Math.floor(
    (((product.Size?.M?.MRP||product.Size?.["free size"]?.MRP) - (product.Size?.M?.trialshopyPrice|| product.Size?.["free size"]?.trialshopyPrice) )/ (product.Size?.M?.MRP|| product.Size?.["free size"]?.MRP)) * 100
  );

  useEffect(() => {
    // Check if Size is not undefined or null
    const sizeKeys = Object.keys(Size || {});
    if (sizeKeys.length > 0) {
      setSelectedSize(sizeKeys[0]);
    }
  }, [Size]);
  return (
    <div className="flex flex-col items-start justify-between h-full w-60 hover:scale-[102%] duration-300 shadow-lg p-2 shrink-0 ">
      <div className="w-full h-44 relative">
        <img
          src={product?.productImage ? product?.productImage : "/noImage.png"}
          alt="product"
          className="w-full h-full "
          width={200}
          height={200}
        />
        <div className="w-5 h-5 absolute top-2 right-2">
          <Image
            src={"/images/store/add_to_wishlist.svg"}
            width={20}
            height={20}
            className={`w-full h-full`}
            alt="heart"
          />
        </div>
      </div>

      <div className="flex flex-col w-full item-start overflow-hidden">
        <Link href={`/products/details?productId=${product._id}`}>
          <h2 className="font-semibold line-clamp-3 overflow-hidden text-ellipsis">{productName}</h2>
        </Link>
        <p className="font-light h-[20px] pb-5 text-gray-500 truncate">
          {shortDescription}
        </p>
        <div className="mt-2 flex flex-row items-center justify-between  w-full">
          <div className="flex flex-row gap-2 lg:gap-2">
            <p className="font-bold text-sm">₹{discountedPrice}</p>
            <p className="font-light line-through text-sm">₹{price}</p>
          </div>

          <p className="text-[green] text-sm">{discount}% off</p>
        </div>
      </div>
    </div>
  );
};

export default StoreProductCard;
