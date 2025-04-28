"use client";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { MdArrowForwardIos, MdOutlinePhone } from "react-icons/md";
import { TbTruckDelivery, TbTruckReturn } from "react-icons/tb";
import { Steps } from "antd";

const OrderDetails = ({ data }) => {
  // console.log("data from orderDetails.jsx", data);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const router = useRouter();
  const [productData, setProductData] = useState(null);

  const icon = (
    <svg
      className="h-7 w-7 mx-auto"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 18 18"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
        clipRule="evenodd"
      />
    </svg>
  );

  const possibleStatuses = [
    { key: "placed", label: "Order Placed" },
    { key: "processed", label: "Order Packed" },
    { key: "shipped", label: "On the Way" },
    { key: "delivered", label: "Delivered" },
  ];
  const formatToLocalDate = (isoString) => {
    return new Date(isoString).toLocaleString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  const handleReturn = async (orderId) => {
    await axios
      .put(`${serverURL}/api/v1/updateSubOrder/${orderId}`, {
        status: "return",
      })
      .then((response) => {
        console.log(`Products data for category ${orderId}:`, response.data);
        alert(`SubOrder Id: ${orderId} Updated successfully!`);
      })
      .catch((error) => {
        console.error(
          `Error fetching products for category ${orderId}:`,
          error
        );
      });
  };
  return (
    <>
      <div className="overflow-x-hidden">
        <div className="flex flex-row my-3">
          <div className="flex flex-col mb-2">
            <button
              onClick={() => router.back()}
              className="text-[18px] px-3 py-2 font-medium from-primary rounded-md to-secondary bg-gradient-to-b"
            >
              Go Back
            </button>
          </div>
        </div>
        <div className="border border-primary shadow rounded-md p-3">
          <div className="text-[16px] font-medium">Delivery Address</div>
          <div className="flex flex-col my-3 space-y-2">
            <p className="font-medium">{data?.shippingAddress?.fullName}</p>
            <p className="text-[16px]">
              {`${data?.shippingAddress?.addressLine || ""}, ${
                data?.shippingAddress?.city || ""
              }, ${data?.shippingAddress?.state || ""}, ${
                data?.shippingAddress?.pincode || ""
              }`.replace(/,\s*$/, "")}
            </p>
            <div>
              <p className="font-bold">Phone Number</p>
              <p>{data?.shippingAddress?.PhoneNumber}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col divide-gray-200 divide-y-2">
          {data.products.map((item, index) => {
            const statusMap = item.statusUpdates.reduce((acc, statusUpdate) => {
              acc[statusUpdate.status] = statusUpdate.timestamp;
              return acc;
            }, {});
            const currentStepIndex =
              possibleStatuses
                .map((status, index) => (statusMap[status.key] ? index : -1))
                .filter((index) => index !== -1)
                .pop() || 0;

            const currentStep = currentStepIndex >= 0 ? currentStepIndex : 0;
            return (
              <div key={index} className="py-4">
                <div className="flex flex-row">
                  <div className="flex w-full md:flex-row md:w-1/2">
                    <Image
                      width={400}
                      height={200}
                      className="w-44 rounded-md h-44"
                      src={
                        item?.productId?.productImage
                          ? item?.productId?.productImage
                          : "/default-image.jpg"
                      }
                      alt="Product Image"
                    />
                    <span className="mx-3">
                      <h2 className="text-[18px] font-bold tracking-widest text-black line-clamp-2">
                        {item?.productId?.productName}
                      </h2>
                      <h1 className="mb-1 text-[14px] md:text-[16px] text-[#7C7C7C] line-clamp-3">
                        {item?.productId?.shortDescription}
                      </h1>
                      <h1 className="mb-1 text-[14px] md:text-[16px] text-[#7C7C7C]   ">
                        Size: {item?.size}
                      </h1>
                      <h1 className="mb-1 text-[14px] md:text-[16px] text-[#7C7C7C]   ">
                        Quantity: {item?.quantity}
                      </h1>
                      <h1 className="flex flex-row my-3 mb-1 ">
                        {/* Assuming rating is available in productData */}
                        <FaStar className="text-yellow-500 mx-0.5" />
                        <FaStar className="text-yellow-500 mx-0.5" />
                        <FaStar className="text-yellow-500 mx-0.5" />
                        <FaStar className="text-yellow-500 mx-0.5" />
                        <FaStar className="text-yellow-500 mx-0.5" />
                        <span className="mx-2 text-[#A1A1AA] md:flex hidden text-[16px]">
                          ({productData?.rating?.rating})
                        </span>
                      </h1>
                    </span>
                  </div>
                  <div className="items-center hidden mx-4 md:grid md:w-1/2 py-auto ">
                    {/* <Link href={`/product/${productData.id}`}> */}
                    <Link
                      href={`/products/details?productId=${item?.productId?._id}`}
                    >
                      <p className="w-fit flex flex-row items-center bg-gradient-to-b from-primary to-secondary px-4 py-2 rounded-md ml-auto">
                        View Products
                        <MdArrowForwardIos className="mx-1" />
                      </p>
                    </Link>
                    {item.status !== "return" && (
                      <button onClick={() => handleReturn(item?._id)}>
                        <p className="w-fit flex flex-row items-center bg-gradient-to-b from-primary to-secondary px-4 py-2 rounded-md ml-auto">
                          Return
                          <TbTruckReturn className="mx-1" />
                        </p>
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex w-full py-3 my-3 bg-green-600 rounded-md">
                  <span className="mx-2 mt-2">
                    <Image
                      width={20}
                      height={20}
                      className="w-10 h-10 p-2"
                      src={"/images/Vector20.png"}
                      alt="imgg"
                    />
                  </span>
                  <span className="flex flex-col">
                    <span className="flex flex-col">
                      <span className="text-[16px] text-white font-medium">
                        {item?.status}
                      </span>
                    </span>
                    <span className="text-[14px] text-white">
                      On {data?.orderDate}
                    </span>
                  </span>
                </div>

                {/* Here is steps */}
                <div className="my-4">
                  <Steps current={currentStep} responsive>
                    {possibleStatuses.map((status, idx) => (
                      <Steps.Step
                        key={status.key}
                        title={status.label}
                        description={
                          statusMap[status.key]
                            ? formatToLocalDate(statusMap[status.key])
                            : "Not Updated"
                        }
                        icon={icon}
                      />
                    ))}
                  </Steps>
                </div>

                <div className="my-4">
                  <div className="flex flex-row">
                    <TbTruckDelivery className="text-red-400 text-2xl mr-2" />
                    EXPRESS
                    <span className="text-[#7C7C7C] text-[14px] mx-1">
                      Order delivered in 30 Mint
                    </span>
                  </div>
                  <div className="my-3">
                    <span className="pl-2 font-bold">∙</span>
                    <span className="px-2 text-[#7C7C7C] text-[14px]">
                      Exchange/Return window closed on{" "}
                      {data?.formattedExchangeReturnDate}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div>
          <div className="text-[16px] font-medium">Payment Information</div>

          {/* <div className="flex flex-row w-full  text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
            <div className="flex justify-end ml-auto font-medium text-black ">
              ₹{data?.price?.toFixed(2)}
            </div>
          </div> */}

          <div className="flex flex-row w-full text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
            <div className="flex justify-start text-[16px] ">Discount</div>

            <div className="flex justify-end ml-auto font-medium text-black ">
              ₹ {data?.discount?.toFixed(2) || 0}
            </div>
          </div>

          {/* <div className="flex flex-row w-full text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
            <div className="flex justify-start text-[16px] ">
              Discounted Price
            </div>

            <div className="flex justify-end ml-auto font-medium text-black ">
              ₹{data?.discountedPrice?.toFixed(2)}
            </div>
          </div> */}

          <div className="flex flex-row w-full text-[#7C7C7C] text-[14px] py-1 my-1 border-b border-gray-500">
            <div className="flex justify-start text-[18px] font-semibold text-black ">
              Total Paid
            </div>

            <div className="flex justify-end ml-auto font-medium text-black ">
              ₹{data?.payment[0]?.totalAmount?.toFixed(2)}
            </div>
          </div>

          <div className=" bg-[#F3F3F3] lg:w-1/5 md:w-1/3 w-3/5 flex flex-row py-4 my-3 px-6">
            <Image src="/images/bhim.svg" alt="myIcon" width={30} height={30} />
            <span className="text-[#7C7C7C] text-14px mx-2">Paid by UPI</span>
          </div>
          <div>
            <div className="my-1 text-[16px] font-medium">Updates sent to</div>
            <div className="flex flex-row items-center text-[#7C7C7C] text-xl">
              <MdOutlinePhone />
              {data?.phone_number}
            </div>
          </div>
          <div className="my-3">
            <span className="text-[#7C7C7C]">Order ID </span>
            <span className="text-[#7C7C7C]">#{data?._id}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderDetails;
