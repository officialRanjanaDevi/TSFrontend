import React from "react";
import Image from "next/image";
import Link from "next/link";

const img_fashion = "/images/clothing/MShirt.svg";

const BrandCard = ({ productDetails }) => {
  //console.log('id',productDetails._id)
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  return (
    <>
      <Link
        href={{
          pathname: "brand-deals/subcategory",
          query: { brandId: productDetails._id },
        }}
      >
        <div className="flex flex-col gap-2 items-center">
          <div className="flex  flex-col items-center justify-center w-full h-[255px]">
            <img
              width={200}
              height={200}
              src={`${serverURL}/api/v1${productDetails.logo.url}`}
              alt="Deal image"
              className="w-[90%]  h-[90%] border "
              crossOrigin="anonymous"
            />
            <div className="relative w-[75%] rounded -mt-10">
              <div className="bg-white p-1 shadow-md">
                <div className="mt-1 font-medium uppercase justify-center flex text-sm md:text-base">
                  {productDetails.name}
                </div>
                <div className="mt-2 text-center text-sm text-[#22191C] font-400 pb-4">
                  Up to 40% OFF
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BrandCard;
