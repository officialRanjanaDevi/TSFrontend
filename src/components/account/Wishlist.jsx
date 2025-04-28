"use client";
import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/lib/UserContext";
import axios from "axios";
import Link from "next/link";
import Pagination from "../pagination/Pagination";
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed  inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex items-center justify-center backdrop-blur">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="bg-white mx-3 md:mx-0  border-2 border-[#EB8105]   px-1 py-3 rounded-md">
          <div className="">{children}</div>

          <button
            className="px-5 bg-[#EB8105] py-2 font-bold flex ml-4 rounded-md"
            onClick={onClose}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Wishlist() {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [isEmpty, setIsEmpty] = useState(false);
  const [wishlistData, setWishlistData] = useState([]);
  const [showAddToLiveViewModal, setShowAddToLiveViewModal] = useState(false);
  const [showAlreadyAddedModal, setShowAlreadyAddedModal] = useState(false);
  const [showRemoveSuccessModal, setShowRemoveSuccessModal] = useState(false);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const userId = authenticated.user._id;
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil( wishlistData.length / 3);
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    const fetchData = async () => {
      const wishList = authenticated.user.wishList || [];

      if (wishList.length === 0) {
        setIsEmpty(true);
        setLoading(false);
        return;
      }

      try {
        const fetchProductsData = async () => {
          const productPromises = wishList.map(async (prodId) => {
            try {
              const res = await axios.get(
                `${serverURL}/api/v1/products/${prodId}`
              );
              return res.data;
            } catch (error) {
              console.error(`Error fetching product ${prodId}:`, error);
              return null; // Return null for failed requests
            }
          });

          const products = await Promise.all(productPromises);

          // Filter out null values (failed requests)
          const validProducts = products.filter((product) => product !== null);

          setWishlistData((prev) => {
            const uniqueProducts = validProducts.filter(
              (product) => !prev.some((item) => item._id === product._id)
            );
            return [...prev, ...uniqueProducts];
          });

          setLoading(false);
        };

        fetchProductsData();
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [authenticated, authenticated.user, serverURL]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const res = await axios.delete(
        `${serverURL}/api/v1/deleteWishList/${authenticated.user._id}/${productId}`
      );

      // Use functional update to ensure that we have the latest state
      setWishlistData((prevWishlistData) =>
        prevWishlistData.filter((item) => item._id !== productId)
      );
      setShowRemoveSuccessModal(true);
      setAuthenticated({
        ...authenticated,
        user: { ...authenticated.user, wishList: res.data.wishList },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowAddToLiveViewModal(false);
    setShowAlreadyAddedModal(false);
    setShowRemoveSuccessModal(false);
  };

  const Column = ({
    _id,
    images,
    productName,
    productImage,
    price,
  
    fullDescription,
    Size = {},
  }) => {

    const [selectedSize, setSelectedSize] = useState();
    const sizePrice = Size[selectedSize]?.trialshopyPrice || Size['FreeSize']?.trialshopyPrice;
    const MRP = Size[selectedSize]?.MRP || Size['M']?.MRP || Size['FreeSize']?.MRP;
    const discount =Math.floor(((MRP-sizePrice)/MRP)*100)
    useEffect(() => {
      // Check if Size is not undefined or null
      const sizeKeys = Object.keys(Size || {});
      if (sizeKeys.length > 0) {
        setSelectedSize(sizeKeys[0]);
      }
    }, [Size]);
    return (
      <>
        <div className="flex rounded m-2 lg:px-4   overflow-hidden shadow-md hover:shadow-lg transition-all duration-300">
      
            <Link
              href={`/products/details?productId=${_id}`}
              className="w-[50%] sm:w-[20%] h-[30vh] rounded p-2"
            >
              <img
                alt={productName}
                className="object-cover border-2 w-full h-full rounded "
                src={productImage}
              />
            </Link>
          <div className="w-[50%] sm:w-[80%]">
            <Link href={`/products/details?productId=${_id}`}>
              <section className="flex items-center">
                <div className="py-1 w-full">
                  <div className="flex flex-row  ">
                    {/* end */}

                    <div className=" w-full bg-[#F1F1F180] py-4 px-4 lg:bg-white  ">
                      <h2 className="text-[14px font-semibold pt-1 ">
                        {productName}
                      </h2>
                      <div className="flex flex-row">
                        <span className="hidden sm:block text-[#7C7C7C] text-[10px] lg:text-[14px] justify-start">
                          {fullDescription}
                        </span>
                      </div>
                      <div className="pt-2 lg:pt-0 text-[14px]">
                        <span className="font-semibold ">₹{sizePrice}</span>
                        <span className="font-semibold line-through text-red-500 px-2">₹{MRP}</span>
                        <span className=" px-2 text-[#7C7C7C]">
                          ({discount}% OFF)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <span className="flex justify-end">
                  <Image
                    width={50}
                    height={60}
                    alt="arrow"
                    className="w-4 h-4 "
                    src="/images/Vector5.svg"
                  />
                </span>{" "}
              </section>{" "}
            </Link>
            <div className="m-1">
              <button
                className="text-red-400 hover:underline"
                onClick={() => handleRemoveFromWishlist(_id)}
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  const WishlistItemLoader = () => (
    <>
      <div className="flex items-center m-2 lg:px-4 lg:m-0 lg:w-full w-[95vw] overflow-hidden shadow-md border-[2px]">
        {/* Your skeleton loader UI here */}
        <div className="py-5    w-full bg-[#F1F1F180] px-4 lg:bg-white animate-pulse">
          <div className="flex flex-row">
            <div className="w-20 h-20 bg-gray-300 rounded"></div>
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

  const EmptyWishlist = () => {
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="h-fit my-3">
          <Image
            width={20}
            height={20}
            alt="empty_live_demo"
            loading="eager"
            unoptimized={true}
            src={"/images/cart/Empty_box.gif"}
            className="w-[70vw] md:w-[40vw] lg:w-[20vw]"
          />
          <div className="text-center">Wishlist is empty!</div>
        </div>{" "}
        <Link
          href="/products"
          className=" bg-gradient-to-t from-[#FAAC06] to-[#EB8105] px-3 py-2 rounded w-fit"
        >
          Add Products
        </Link>
      </div>
    );
  };

  return (
    <>
      <div className=" font-semibold text-[18px]">Wishlist</div>
      <div className="flex flex-col justify-between h-full py-1 lg:py-0">
        {/* Render loading indicator only if loading is true */}
        {loading ? (
          Array.from({ length: 3 }, (_, index) => (
            <WishlistItemLoader key={index} />
          ))
        ) : wishlistData?.length > 0 ? (
          wishlistData.slice((currentPage-1)*3,3*currentPage).map((item, index) => <Column key={index} {...item} />
        
        
        )
        ) : (
          <EmptyWishlist />
        )}

{ wishlistData?.length > 0 ? 
        <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
       : <></>}
      </div>
  
      <Modal isOpen={showAddToLiveViewModal} onClose={closeModal}>
        <div className="p-4">
          <p className="text-lg font-semibold">
            Product added to Cart successfully!
          </p>
        </div>
      </Modal>

      <Modal isOpen={showAlreadyAddedModal} onClose={closeModal}>
        <div className="p-4">
          <p className="text-lg font-semibold">
            Product is already added in cart!
          </p>
        </div>
      </Modal>

      <Modal isOpen={showRemoveSuccessModal} onClose={closeModal}>
        <div className="p-4">
          <p className="text-lg font-semibold">
            Product removed from wishlist successfully!
          </p>
        </div>
      </Modal>
    </>
  );
}
