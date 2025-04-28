"use client";
import React, {
  useEffect,
  useState,
  useCallback,
  useRef,
  useContext,
} from "react";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";
import { AiFillHeart } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import CartItemCard from "./CartItemCard";
import LiveProductCard from "../liveproduct/LiveProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { UserContext } from "@/lib/UserContext";
import LiveDemoCart from "./LiveDemocart";
import Loading from "../common/Loading";
import { CartContext } from "@/lib/cartProvider";

export default function Cart({ setIsCart }) {
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [cartItems, setCartItems] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [activeTab, setActiveTab] = useState("cart");
  const router = useRouter();
  const [liveDemoProducts, setLiveDemoProducts] = useState([]);

  const cartRef = useRef(null);

  function handleActiveTab(value) {
    setActiveTab(value);
  }

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCart(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [setIsCart]);

  useEffect(() => {
    const fetchCartItems = async () => {
      // console.log("cartData", cart);
      if (cart) {
        setCartItems(cart);
      } else if (
        authenticated.user &&
        authenticated.user._id &&
        authenticated.user._id !== null
      ) {
        try {
          setLoading(true);
          const customerId = authenticated.user?._id;
          const response = await axios.get(
            `${serverURL}/api/v1/cart/${customerId}`
          );
          const data = response.data;
          setCartItems(data[0].items);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCartItems();
  }, [serverURL, authenticated.user?._id]);

  const fetchLiveDemoProducts = useCallback(async () => {
    const customerId =
      authenticated.user?._id || localStorage.getItem("customerId");
    try {
      const response = await axios.get(
        `${serverURL}/api/v1/liveDemo/${customerId}`
      );
      const data = response.data;

      if (data.items) {
        setLiveDemoProducts(data.items);
      } else {
        console.warn("Invalid live demo products data format:", data);
      }
    } catch (error) {
      console.error("Error fetching live demo products:", error);
    }
  }, [serverURL, authenticated.user?._id]);

  useEffect(() => {
    if (authenticated.user && authenticated.user._id) {
      fetchLiveDemoProducts();
    }
  }, [fetchLiveDemoProducts]);

  useEffect(() => {
    let totalProductPrice = 0;
    let totalDiscount = 0;

    // Calculate total product price and discount
    cartItems?.forEach((item) => {
      const selectedSize = item.size;
      const itemPrice =
        item.productId?.Size[selectedSize]?.trialshopyPrice || 0;

      const itemDiscount = item.productId?.discount || 0;
      const itemQuantity = item?.count || 1;

      totalProductPrice += itemPrice * itemQuantity;
      totalDiscount += (itemPrice * itemDiscount * itemQuantity) / 100;
    });

    // Calculate overall discount percentage
    const discountPercentage = (totalDiscount / totalProductPrice) * 100 || 0;

    // Calculate subtotal
    const subtotal = totalProductPrice - totalDiscount;

    // Update state
    setTotalProductPrice(totalProductPrice);
    setTotalDiscount(totalDiscount);
    setDiscountPercentage(discountPercentage);
    setSubtotal(subtotal);
  }, [cartItems]);

  // Function to update total prices based on cart qty decrement
  const updateTotalPrices = () => {
    let totalProductPrice = 0;
    let totalDiscount = 0;

    // Calculate total product price and discount
    cartItems.forEach((item) => {
      const selectedSize = item.size;
      const { productId } = item;
      const itemPrice = productId?.Size[selectedSize]?.trialshopyPrice || 0;
      const itemDiscount = productId?.discount || 0;
      const itemQuantity = productId?.quantity || 1;

      totalProductPrice += itemPrice * itemQuantity;
      totalDiscount += (itemPrice * itemDiscount * itemQuantity) / 100;
    });

    const discountPercentage = (totalDiscount / totalProductPrice) * 100 || 0;

    const subtotal = totalProductPrice - totalDiscount;

    setTotalProductPrice(totalProductPrice);
    setTotalDiscount(totalDiscount);
    setDiscountPercentage(discountPercentage);
    setSubtotal(subtotal);
  };

  const handleRemoveProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `${serverURL}/api/v1/liveDemo/removeProduct/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${authenticated.token}`,
          },
        }
      );
      const data = response.data;
      console.log("data after remove from cart.jsx", data);
      if (data?.ProductRemoval === "Successful") {
        fetchLiveDemoProducts();
      }
    } catch (error) {
      console.error("Error removing product from live demo:", error);
    }
  };

  const handleGoLive = (storeName) => {
    // Update the router to navigate to LiveProduct1 page with the storeName parameter
    router.push(`/liveproduct1?storeId=${encodeURIComponent(storeName)}`);
    // Optionally, you can close the cart modal
    setIsCart(false);
  };

  const handleCartItemUpdate = async (updatedItem) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === updatedItem._id ? updatedItem : cartItem
    );

    setCartItems(updatedCartItems);
    const response = await axios.put(
      `${serverURL}/api/v1/updateCart/${authenticated.user._id}`,
      {
        items: updatedCartItems,
      }
    );
    setCart(updatedCartItems);
  };

  return (
    <>
      <div className="fixed top-0 bg-black bg-opacity-50 z-20 w-full h-full flex items-center justify-center">
        <div
          ref={cartRef}
          className="absolute top-auto right-5 lg:top-0 lg:right-0 bg-white w-[90vw] md:w-[60vw] lg:w-[40vw] h-[80vh] lg:h-full rounded shadow-2xl flex flex-col justify-between overflow-auto"
        >
          <div>
            <div className="flex flex-row justify-between p-5">
              <div className="flex gap-5 justify-between text-xl">
                <span
                  className={`font-bold text-[22px] lg:[24px] md:[24px] xl:[24px] 2xl:[24px] cursor-pointer ${
                    activeTab === "cart"
                      ? "border-b-2 border-[#EB8105] text-black"
                      : "text-black border-b"
                  }`}
                  onClick={() => handleActiveTab("cart")}
                >
                  Cart
                </span>
                <span
                  className={`font-bold text-[22px] lg:[24px] md:[24px] xl:[24px] 2xl:[24px] cursor-pointer ${
                    activeTab === "live demo"
                      ? "border-b-2 border-[#EB8105] text-black"
                      : "text-black border-b"
                  }`}
                  onClick={() => handleActiveTab("live demo")}
                >
                  Live Demo
                </span>
              </div>
              {/* Close button */}
              <div
                className="hover:cursor-pointer border border-[#EB8105] rounded p-1"
                onClick={() => {
                  setIsCart(false);
                }}
              >
                <AiOutlineClose size={20} />
              </div>
            </div>

            {activeTab === "live demo" && (
              <LiveDemoCart
                liveDemoProducts={liveDemoProducts}
                onRemoveProduct={handleRemoveProduct}
                onGoLive={handleGoLive}
                setIsCart={setIsCart}
              />
            )}

            {activeTab === "cart" && (
              <>
                {loading ? (
                  <Loading />
                ) : (
                  <>
                    {cartItems?.length > 0 ? (
                      <>
                        <div className="w-full">
                          {cartItems?.map((item, index) => (
                            <CartItemCard
                              product={item}
                              key={index}
                              updateCartItem={handleCartItemUpdate}
                              setCartItems={setCartItems}
                              //removeCartItem={removeCartItem}
                              updateTotalPrices={updateTotalPrices} // Pass the callback to update total prices
                            />
                          ))}
                        </div>
                        <div className="flex flex-col px-5">
                          <div className="flex justify-between">
                            <h1 className="text-lg">Product Pricing:</h1>
                            <div className="flex text-lg ">
                              <h1 className="pr-[5px] font-bold">
                                ₹. {totalProductPrice.toFixed(2)}
                              </h1>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col my-[12px] px-5">
                          <div className="flex justify-between">
                            <h1 className="text-lg">Discount:</h1>
                            <div className="flex text-lg ">
                              <h1 className="pr-[5px] font-bold text-[#16A34A]">
                                {discountPercentage.toFixed(2)}%
                              </h1>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="flex flex-col my-[12px] px-5">
                          <div className="flex justify-between">
                            <h1 className="text-lg">Subtotal:</h1>
                            <div className="flex text-lg ">
                              <h1 className="pr-[5px] font-bold">
                                ₹. {subtotal.toFixed(2)}
                              </h1>
                            </div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <div className="h-[50vh]">
                        <Image
                          width={20}
                          height={20}
                          alt="empty_cart"
                          loading="eager"
                          unoptimized={true}
                          src={"/images/cart/Empty_box.gif"}
                          className="w-[70vw] md:w-[40vw] lg:w-[20vw] m-auto lg:mt-20"
                        />
                        <div className="text-center">
                          Looks like your cart is empty!
                        </div>
                      </div>
                    )}
                  </>
                )}
                {/* Checkout/Wishlist buttons */}
                <div className="px-1 md:px-5 w-full h-[100px] flex flex-row items-center justify-start py-4">
                  <Link
                    onClick={() => {
                      setIsCart(false); // Close the cart modal before navigating
                    }}
                    href="/account/wishlist"
                    className="bg-gradient-to-b from-primary to-secondary w-full rounded mr-1 px-2 py-1 flex flex-row items-center justify-center"
                  >
                    <AiFillHeart size="1rem" className="mr-1" />
                    My Wishlist
                  </Link>
                  {cartItems?.length !== 0 ? (
                    <button
                      type="button"
                      // onClick={() => handleOpenRazorpay(subtotal)}
                      onClick={() => {
                        window.location.replace("/checkout");
                        setIsCart(false);
                      }}
                      className="text-center bg-gradient-to-b from-primary to-secondary w-full rounded ml-1 px-2 py-1"
                    >
                      Checkout
                    </button>
                  ) : (
                    <Link
                      href="/"
                      onClick={() => {
                        setIsCart(false);
                      }}
                      className="text-center bg-gradient-to-b from-primary to-secondary w-full rounded ml-1 px-2 py-1"
                    >
                      Continue Shopping
                    </Link>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
