"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
const Confirmation = ({ data }) => {
  const today = new Date();
  const futureDate = new Date();
  futureDate.setDate(today.getDate() + 8);

  return (
    <div className="my-3 flex flex-col items-center gap-2">
      <Image
        height={200}
        width={200}
        alt="Order"
        src="/images/NameLogo.png"
        className="block mx-auto"
      />
      <div className="flex">
        <div className="">
          <h3 className="text-[#7C7C7C] font-semibold font-poppins text-[11px] sm:text-[17px] ">
            SHOPPING CART
          </h3>
        </div>

        <hr className="border border-dashed w-[100px] ml-[15px] mt-[12.5px] border-[#7C7C7C]" />
        <h3 className="text-[#7C7C7C] font-poppins ml-[15px] text-[11px] sm:text-[17px] ">
          PAYMENT
        </h3>
        <hr className="border border-dashed w-[100px] ml-[15px] mt-[12.5px] border-[#7C7C7C]" />
        <div>
          <h3 className=" text-[#EB8105]  font-poppins ml-[10px] text-[11px] sm:text-[17px]">
            CONFIRMATION
          </h3>
          <hr className=" border-[#EB8105] border-[1.5px] w-[90px] sm:w-[130px] ml-[15px] mt-[1px] " />
        </div>
      </div>
      {/* Confirmation Card */}
      <div className="w-full sm:w-[700px] bg-white shadow-lg p-6 rounded-lg">
        <div className="text-center">
          <Image
            height={80}
            width={80}
            alt="confirm"
            src="/images/VectorC.svg"
            className="mx-auto"
          />
          <Image
            height={150}
            width={150}
            alt="Order Confirmed"
            src="/images/OrderConfirmed.svg"
            className="mx-auto mt-4"
          />
          <p className="mt-4 text-sm sm:text-lg">
            Your order #{data?._id} was placed successfully. You can check the
            status of your order anytime.
          </p>
        </div>

        {/* Order Details */}
        <div className="mt-6">
          <h3 className="text-xs sm:text-lg font-semibold">
            Order No: {data?._id}
          </h3>
          <h3 className="text-xs sm:text-lg mt-2">
            Shipping to:{" "}
            {`${data?.shippingAddress?.addressLine || ""}, ${
              data?.shippingAddress?.city || ""
            }, ${data?.shippingAddress?.state || ""}, ${
              data?.shippingAddress?.pincode || ""
            }`.replace(/,\s*$/, "")}
          </h3>
          <div className="mt-4 flex items-center text-sm sm:text-lg">
            <Image
              height={20}
              width={20}
              alt="tick"
              src="/images/VectorTick.svg"
              className="w-4 h-4"
            />
            <span className="ml-2">Delivery by:</span>
            <span className="font-bold ml-2">{futureDate.toDateString()}</span>
          </div>
        </div>
        {/* Buttons */}
        <div className="gap-[5px] flex flex-row">
          <Link href="/categories">
            <div className="mx-2 sm:w-[300px]  h-[40px] border border-primary text-primary w-full px-3 py-2 rounded text-center my-5">
              Continue Shopping
            </div>
          </Link>
          <Link href="/account/orders">
            <div className="mx-2 sm:w-[300px] h-[40px] bg-gradient-to-b from-primary to-secondary w-full px-3 py-2 rounded text-center my-5">
              Track Order
            </div>
          </Link>
        </div>
        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 overflow-hidden">
          {data?.products?.map((item, index) => (
            <div key={index} className="flex items-start">
              <Image
                height={128}
                width={128}
                alt="Product"
                className="h-32 w-32 object-cover rounded-md shadow"
                src={item?.productId?.productImage || "/images/Rectangle.jpg"}
              />
              <div className="ml-4">
                <h2 className="text-sm sm:text-lg font-medium line-clamp-3">
                  {item?.productId?.productName}
                </h2>
                <p className="text-xs sm:text-base text-gray-500 mt-1">
                  {item?.size}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
