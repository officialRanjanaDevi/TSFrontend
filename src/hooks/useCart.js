import { useContext, useState } from "react";
import axios from "axios";
import { CartContext } from "@/lib/cartProvider";

const useCart = (userId) => {
  const [error, setError] = useState("");
  const [loaderAddCart, setLoaderAddCart] = useState(false);
  const { cart, setCart } = useContext(CartContext);

  const addToCart = async (productId, quantity, selectedSize, serverURL) => {
    if (!userId) {
      setError("Please Login to Add Product to Cart");
      return;
    }

    try {
      setLoaderAddCart(true);
      const currentCartData = await axios.get(
        `${serverURL}/api/v1/cart/${userId}`
      );

      const isProductAlreadyInCart = currentCartData.data[0]?.items?.some(
        (item) => item.productId?._id.toString() === productId.toString()
      );

      if (isProductAlreadyInCart) {
        return { status: "alreadyInCart" };
      }

      const response = await axios.post(`${serverURL}/api/v1/cart/addItem`, {
        productId,
        count: Number(quantity),
        size: selectedSize,
        customerId: userId,
      });

      const newCartData = await axios.get(`${serverURL}/api/v1/cart/${userId}`);
      setCart(newCartData.data[0].items);
      return { status: "success" };
    } catch (error) {
      console.log(error);
      return { status: "error", error };
    } finally {
      setLoaderAddCart(false);
    }
  };

  return {
    cart,
    addToCart,
    error,
    loaderAddCart,
  };
};

export default useCart;
