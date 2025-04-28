"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";
import Image from "next/image";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";
import { CartContext } from "@/lib/cartProvider";
import Link from "next/link";

const CartItemCard = ({
  product,
  updateCartItem,
  // removeCartItem,
  setCartItems,
  updateTotalPrices,
  cartItems,
}) => {
  const initialQuantity = product.quantity || 1;
  const [quantity, setQuantity] = useState(initialQuantity);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);
  const [tempQuantity, setTempQuantity] = useState(initialQuantity);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const { cart, setCart } = useContext(CartContext);
  const { productId } = product;
  // console.log("productId", productId);
  const [selectedSize, setSelectedSize] = useState(product?.size);
  // console.log(selectedSize, "selectedSize from Popup");

  useEffect(() => {
    // Update quantity when product changes
    setQuantity(product.count || 1);
  }, [product]);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const handleIncrement = () => {
    setQuantity((prevQuantity) => {
      const newQuantity = prevQuantity + 1;
      updateCartItem({ ...product, count: newQuantity });
      return newQuantity;
    });
  };

  const handleDecrement = () => {
    const newQuantity = quantity - 1;

    if (newQuantity < 1) {
      // If quantity becomes less than 1, show the modal
      setTempQuantity(quantity); // Save the current quantity temporarily
      setIsRemoveModalOpen(true);
    } else {
      // If quantity is still greater than 0, update the quantity
      setQuantity(newQuantity);
      updateCartItem({ ...product, count: newQuantity });
    }
  };

  const handleRemove = async () => {
    if (!productId || !productId._id) {
      console.error("Invalid productId:", productId);
      return;
    }
    try {
      const response = await axios.delete(
        `${serverURL}/api/v1/cart/deleteItem/${productId._id}`,
        {
          headers: {
            Authorization: `Bearer ${authenticated.token}`,
          },
        }
      );
      // console.log("Response of de:", response);

      if (response.status === 200) {
        // await removeCartItem(product);
        setCartItems(response?.data?.CartData?.items);
        setCart(response?.data?.CartData?.items);

        setIsRemoveModalOpen(false);
        // updateTotalPrices();
      } else {
        console.error("Error removing item from cart:", response.data);
      }
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  const handleCloseRemoveModal = () => {
    // Restore the original quantity if Cancel is clicked
    setQuantity(tempQuantity);
    setIsRemoveModalOpen(false);
  };

  // const totalPrice = quantity * productId?.price;
  const discountedPrice = productId?.discount
    ? productId?.price - (productId?.price * productId.discount) / 100
    : productId?.price;

  return (
    <div className="w-full overflow-y-auto rounded">
      <div className="px-6">
        <div className="my-[15px] flex flex-row  h-auto">
          <div className="flex items-center">
            {productId?.productImage && (
              <img
                src={productId?.productImage}
                alt={productId?.productName}
                width={120}
                height={120}
                className="object-cover w-[54px] h-[54px] lg:w-[120px] lg:h-[120px]"
              />
            )}
          </div>
          <div className="ml-4 w-[300px] sm:w-[495px] flex flex-col my-[13px] gap-1">
            <div className="flex justify-between items-center h-auto ">
              <h1 className="text-[11.5px] font-semibold font-poppins lg:text-xl lg:leading-6">
                <Link href={`/products/details?productId=${productId?._id}`}>
                  {productId?.productName}
                </Link>
              </h1>
              <div className="flex text-[12px] font-normal lg:text-[16px] gap-1 lg:leading-5">
                <h1 className="line-through text-gray-500">₹</h1>

                <h1 className="pr-[10px] line-through text-gray-500">
                  {productId?.Size[selectedSize]?.MRP}
                </h1>
                <h1>₹</h1>
                <h1 className="pr-[5px] font-medium">
                  {productId?.discount
                    ? discountedPrice
                    : productId?.Size[selectedSize]?.trialshopyPrice}
                </h1>
              </div>
            </div>
            <div className="flex justify-between">
              <p className="flex items-center gap-1">
                Size:
                <span className="font-bold text-gray-400">{selectedSize}</span>
              </p>
              {/* <p>sold by {productId?.storeId?.storeName}</p> */}
            </div>
            <div className="flex justify-between items-center h-[34px]">
              <h1 className="text-[#EB8105] text-[14px] lg:text-[16px] leading-6 font-normal">
                {quantity <= productId?.Size[selectedSize]?.Inventory
                  ? "In stock"
                  : "Out of stock"}
              </h1>
              <div className="flex sm:gap-[10px] gap-5 items-center ">
                <CiSquareMinus
                  onClick={handleDecrement}
                  size="3rem"
                  className="text-gray-500 hover:cursor-pointer  w-[16.42px] h-[16.79px] lg:w-[34px] lg:h-[34px]"
                />
                <div className="my-auto text-[10px] ">{quantity}</div>
                <CiSquarePlus
                  onClick={handleIncrement}
                  size="3rem"
                  className="text-gray-500 hover:cursor-pointer w-[16.42px] h-[16.79px] lg:w-[34px] lg:h-[34px]"
                />
              </div>
            </div>

            <div className="flex justify-between items-center h-[34px]">
              <button
                onClick={() => setIsRemoveModalOpen(true)}
                className="text-red-500 hover:underline"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>

      {isRemoveModalOpen && (
        <div className="fixed px-5 z-[2] top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 backdrop-blur">
          <div className="bg-white p-4 rounded flex flex-col  border-2">
            <p className="mb-4">
              Are you sure you want to remove this product from the cart?
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCloseRemoveModal}
                className="bg-gradient-to-b from-primary to-secondary px-2 rounded text-black text-[16px]  font-semibold font-poppins"
              >
                Cancel
              </button>
              <button
                onClick={handleRemove}
                className="bg-gradient-to-b from-primary to-secondary  text-black rounded px-4 py-2 mr-2 text-[16px]  font-semibold font-poppins"
              >
                Ok
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartItemCard;
