import React, { Suspense } from "react";
import Shoppingcart from "@/components/payments/shoppingcart";
import Image from "next/image";

export default function Checkout() {
  return (
    <>
      <div className="flex  flex-col items-center overflow-hidden mt-[40px]">
        <Image
          width={250}
          height={300}
          alt=""
          src="/images/NameLogo.png"
          className="hidden max-w-sm mb-10 sm:block"
        />
        <div className="flex">
          <div className="">
            <h3 className="text-[#EB8105] font-semibold font-poppins sm:ml-[50px]  text-[14px] sm:text-[17px] ">
              SHOPPING CART
            </h3>
            <hr className=" border-[#EB8105] border-[1.5px] w-[110px] sm:ml-[53px] mt-[1px] " />
          </div>

          <hr className="border border-dashed  md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />
          <h3 className="text-[#7C7C7C] font-poppins ml-[4px] text-[14px] sm:text-[17px] ">
            PAYMENT
          </h3>
          <hr className="border border-dashed md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />
          <div>
            <h3 className=" text-[#7C7C7C]  font-poppins ml-[4px] text-[14px] sm:text-[17px] ">
              CONFIRMATION
            </h3>
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full gap-12 overflow-hidden md:flex-row ">
        <Suspense>
          <Shoppingcart />
        </Suspense>
      </div>
      <div></div>
    </>
  );
}
