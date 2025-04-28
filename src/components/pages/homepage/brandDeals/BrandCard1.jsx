import React from "react";

const img_fashion = "/images/clothing/MShirt.svg";

const BrandCard1 = ({ productDetails }) => {
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  return (
    <>
      <div className="flex flex-col  items-center hover:font-semibold">
        <div
          className={`transition-all w-[82px]  h-[82px] md:w-24 md:h-24 lg:w-36 lg:h-36 rounded-full overflow-hidden hover:shadow-lg `}
        >
          <img
            width={200}
            height={200}
            src={`${serverURL}/api/v1${productDetails.logo.url}`}
            alt="Deal imgee"
            className="object-cover border-2 w-full h-full rounded-full"
            crossOrigin="anonymous"
          />
        </div>

        <div className="w-full mt-2">
          <p className="w-full h-30 font-poppins text-center text-xs lg:text-base leading-[150%]">
            {productDetails.name}
          </p>
        </div>
      </div>
    </>
  );
};

export default BrandCard1;
