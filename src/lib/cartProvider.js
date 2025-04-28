"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useContext(UserContext);

  const [buyNow, setBuyNow] = useState({
    quantity: null,
    productDetails: null,
    size: null,
    address: null,
    coupon:null
  });

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (
        authenticated.user &&
        authenticated.user._id &&
        authenticated.user._id !== null
      ) {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/cart/${authenticated.user._id}`
          );
          setCart(response.data[0].items);
          // console.log("cgfcfg", response.data[0].items);
          // localStorage.setItem("cart", JSON.stringify(response.data[0].items));
        } catch (err) {
          console.error("Error fetching cart items:", err);
          localStorage.removeItem("cart");
        }
      } else {
        localStorage.removeItem("cart");
      }
    };

    fetchCartItems();
  }, [authenticated, authenticated.user]);

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        setBuyNow,
        buyNow,
       
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };
