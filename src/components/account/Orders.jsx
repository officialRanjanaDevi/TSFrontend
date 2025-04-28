"use client";
import React, { useEffect, useState, useContext } from "react";
import {
  AiOutlineRight,
  AiOutlineStar,
  AiFillCheckCircle,
} from "react-icons/ai";
import { BsFillRecordFill } from "react-icons/bs";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import Pagination from "../pagination/Pagination";
// import Pagination from "../pagination/Pagination";

const WishlistItemLoader = () => (
  <>
    <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
      <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
        <div className="flex flex-row">
          <div className="w-20 h-24 bg-gray-300 rounded"></div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
      <span className="flex justify-end">
        <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
      </span>
    </div>
    <div className="my-4"></div>
    <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
      <div className="py-16 w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
        <div className="flex flex-row">
          <div className="w-20 h-24 bg-gray-300 rounded"></div>
          <div className="flex flex-col flex-grow ml-4">
            <div className="h-4 bg-gray-300 rounded w-1/2 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
            <div className="h-3 bg-gray-300 rounded w-2/3"></div>
          </div>
        </div>
        <div className="h-6 bg-gray-300 rounded w-1/4 mt-2"></div>
      </div>
      <span className="flex justify-end">
        <div className="w-4 h-4 bg-gray-300 rounded mr-2"></div>
      </span>
    </div>
  </>
);
const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  let iconStyles = { color: "#7C7C7C", fontSize: "8px" };
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const ordersPerPage = 3;
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    if (
      authenticated.user &&
      authenticated.user._id &&
      authenticated.user._id !== null
    ) {
      setLoading(true)
      axios
        .get(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/${authenticated.user?._id}/myOrders`
        )
        .then(async (response) => {
          if (response.data.data) {
            const formattedOrders = await Promise.all(
              response.data.data.map(async (order) => {
                const detailedProducts = await Promise.all(
                  order.products.map(async (product) => {
                    const productId = product.productId;
                    try {
                      const productDetails = await axios.get(
                        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/products/${productId}`
                      );

                      return {
                        ...product,
                        details: productDetails.data,
                      };
                    } catch (error) {
                      if (error.response && error.response.status === 404) {
                        console.warn(
                          `Product details not found for product ID ${productId}`
                        );
                        return {
                          ...product,
                          details: null,
                        };
                      } else {
                        console.error(
                          `Error fetching product details for product ID ${productId}:`,
                          error
                        );
                        throw error;
                      }
                    }
                  })
                );
                return {
                  ...order,
                  products: detailedProducts,
                  orderDate: new Date(order.orderDate).toLocaleDateString(
                    "en-US",
                    {
                      weekday: "short",
                      day: "numeric",
                      month: "short",
                    }
                  ),
                };
              })
            );
            setOrderData(formattedOrders);
            setLoading(false)

          }
        })
        .catch((error) => {
          setLoading(false)

          console.error("Error fetching data:", error);
        });
    }
  }, [authenticated.user?._id, serverURL]);

  const formatExchangeReturnDate = (dateString) => {
    const date = new Date(dateString);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const formattedDate = `${date.getDate()} ${monthNames[date.getMonth()]}`;
    return `Exchange/Return window closed on ${formattedDate}`;
  };

  // Pagination logic
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderData.slice(indexOfFirstOrder, indexOfLastOrder);
  // console.log("currentOrders", currentOrders);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <div className="flex flex-row my-3">
        <div className="flex flex-col mb-2 ">
          <span className="text-[18px] font-medium">All Orders</span>
          <span className="text-[#7C7C7C] text-[14px]"> from anytime</span>
        </div>


        <div className="flex flex-row justify-end m-2 ml-auto">
          <div className="md:flex hidden flex-row border-[1px]  border-black  mx-2">
            <span className="flex flex-row">
              <Image
                width={20}
                height={20}
                alt=""
                src={"/images/Vector18.png"}
                className="w-8 h-8 my-auto p-2"
              />
            </span>
            <input
              type="text"
              placeholder="Search in orders"
              className=" -p-2"
            />
          </div>
          <div className="flex items-center justify-center ">
            <button className="flex flex-row px-6 py-2 border-[1px] border-black">
              <span>
                <Image
                  width={20}
                  height={20}
                  alt=""
                  src={"/images/Vector19.png"}
                  className="w-[30px] p-2"
                />
              </span>
              Filter
            </button>
          </div>
        </div>
      </div>
      <div className="md:flex mx-4">
      
        <div className="w-full md:w-full md:ml-6 p-4 h-full flex flex-col justify-">
        {loading&&<WishlistItemLoader />}
         
          {currentOrders.length===0?
          <div className="flex flex-col items-center">
             <Image
                        width={20}
                        height={20}
                        alt="empty_live_demo"
                        loading="eager"
                        unoptimized={true}
                        src={"/images/cart/Empty_box.gif"}
                        className="w-[70vw] md:w-[40vw] lg:w-[20vw]"
                      />
            <p> No orders till !</p>
        
            <Link
          href="/products"
          className=" bg-gradient-to-t my-3 from-[#FAAC06] to-[#EB8105] px-3 py-2 rounded w-fit"
        >
          Order Now
        </Link>
          </div>
          :currentOrders.map((item, index) => (
            <Link
              href={{
                pathname: "/account/orders/OrderDetailsPage",
                query: {
                  orderId: item._id,
                },
              }}
              key={index}
              className="md:w-full mb-4 bg-white p-6 rounded-md"
            >
              <div className="flex items-center">
                <div className="w-[48px] h-[48px] bg-black rounded-full flex items-center justify-center">
                  <Image
                    width={30}
                    height={30}
                    className=""
                    src={"/images/orderlogo.svg"}
                    alt="Product Image1"
                  />
                </div>

                <div className="ml-4">
                  <div className="flex items-center text-[#059669]">
                    <div className="mr-1 md:text-[16px] text-[14px]">
                      {item.products[0]?.orderStatus}{" "}
                    </div>
                    <AiFillCheckCircle />
                  </div>
                  <p className="md:text-[14px] text-[12px] text-[#7C7C7C]">
                    On {item.orderDate}
                  </p>
                </div>
              </div>
              <div className="flex items-center my-3 justify-between">
                <div className="">
                  {item.products.map((product, productIndex) => {
                    return (
                      <div key={productIndex} className="flex items-center p-1">
                        <div className="">
                          <img
                            width={100}
                            height={80}
                            className="w-[86px] h-[98px]"
                            src={
                              product.details?.productImage ||
                              "/default-image.jpg"
                            }
                            alt="Product Image"
                          />
                        </div>
                        <div className="ml-4">
                          <div className="md:text-[18px] text-[16px]">
                            {product.details?.productName ||
                              "Product Name Not Available"}
                          </div>
                          <div className="md:text-[14px] text-[12px] text-[#7C7C7C]">
                            {product.details?.shortDescription ||
                              "Description Not Available"}
                          </div>
                          <div className="flex flex-row items-center text-[#7C7C7C]">
                            <Image
                              width={40}
                              height={80}
                              className="w-5 h-5"
                              src={"/images/order/HalfStar.svg"}
                              alt="imgg"
                            />
                            {product.details?.rating?.rating ||
                              "Rating Not Available"}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="text-[#7C7C7C] w-[7.14px] h-[12px]">
                  <AiOutlineRight />
                </div>
              </div>
              <div className="bg-[#F3F3F3] text-[#7C7C7C] pl-2 my-2 flex items-center">
                <div>
                  <BsFillRecordFill {...iconStyles} />
                </div>
                <div className="md:text-[14px] py-2 ml-2 text-[12px]">
                  {formatExchangeReturnDate(item.exchangeReturnWindowClosedOn)}
                </div>
              </div>

              <div className="flex items-center bg-[#F3F3F3] text-[#7C7C7C] py-2 pl-2 my-2">
                <div className="md:text-[14px] text-[12px]">Rate Product</div>
                <div className="flex items-center ml-3">
                  {/* Display the product's rating in stars */}
                  {item.products.map((product, productIndex) => {
                    // Check if product.details is available before accessing rating
                    if (product.details) {
                      // Calculate the percentage of filled stars based on the decimal part
                      const decimalPart = product.details?.rating?.rating % 1;
                      const percentageFilled = decimalPart * 100;

                      // Create an array of stars JSX elements
                      const stars = [...Array(5)].map((star, i) => (
                        <AiOutlineStar
                          key={i}
                          style={{
                            color:
                              i < Math.floor(product.details?.rating?.rating)
                                ? "#FFD700" // Filled star for whole numbers
                                : i ===
                                  Math.floor(product.details?.rating?.rating)
                                ? `linear-gradient(90deg, #C4C4C4 ${percentageFilled}%, #FFD700 ${percentageFilled}%)` // Gradient for decimal part
                                : "#C4C4C4", // Empty star
                          }}
                        />
                      ));

                      return (
                        <React.Fragment key={productIndex}>
                          {stars}
                        </React.Fragment>
                      );
                    }
                    return null; // Return null if product.details is not available
                  })}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(orderData.length / ordersPerPage)}
        onPageChange={paginate}
      />
    </>
  );
};

export default Orders;
