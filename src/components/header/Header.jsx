"use client";
import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import SelectLanguage from "./SelectLanguage";
import SearchBox from "./SearchBox";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import CategoryNavbar from "./CategoryNavbar";
import axios from "axios";
import MobileMenu from "./MobileMenu";
import { UserContext } from "@/lib/UserContext";
import { AiOutlineHeart, AiOutlineUser } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import Cookies from "js-cookie";
import Cart from "../cart/Cart";
import { CartContext } from "@/lib/cartProvider";
import Script from "next/script";

const Header = () => {
  const pathname = usePathname();

  const [authenticated, setAuthenticated] = useContext(UserContext);
  const { cart, setCart } = useContext(CartContext);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [categories, setCategories] = useState([]);
  const [isCart, setIsCart] = useState(false);
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [wishListItems, setWishListItems] = useState([]);
  useEffect(() => {
    if (sessionStorage.getItem("homeCategories")) {
      setCategories(JSON.parse(sessionStorage.getItem("homeCategories")));
    } else {
      const apiurl = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/homeCategories`;

      axios
        .get(apiurl)
        .then((response) => {
          setCategories(response.data);
          //console.log('setCategories',response.data)
          sessionStorage.setItem(
            "homeCategories",
            JSON.stringify(response.data)
          );
        })
        .catch((error) => {
          console.error("Error fetching categories:", error);
        });
    }
  }, []);

  const router = useRouter();
  const searchParams = useSearchParams();
  const url = `${pathname}?${searchParams}`;
  const signInClick = () => {
    router.push(`/account/login?ret=${encodeURIComponent(url)}`);
  };

  useEffect(() => {
    if (
      authenticated &&
      authenticated.user &&
      authenticated.user.wishList &&
      authenticated.user.wishList.length > 0
    ) {
      setWishListItems(authenticated.user.wishList);
    }
  }, [authenticated, authenticated.user, authenticated.user.wishList]);
  // console.log("cartItems from header.jsx", cartItems);

  const logout = () => {
    if (typeof window === "undefined") {
      return;
    }
    router.push("/");
    Cookies.remove("token");
    Cookies.remove("username");
    localStorage.clear();
    setAuthenticated({
      user: {},
      name: "",
      token: "",
    });
  };

  useEffect(() => {
    const fetchCartItems = async () => {
      if (cart) {
        try {
          let cartData;
          if (cart) {
            const cartu = cart;
            cartData = cartu;
          } else {
            cartData = cart;
            setCart(cartData);
          }
          if (!cartData || !Array.isArray(cartData)) {
            console.error("Cart data or items are invalid:", cartData);
            return;
          }
          let cartItem = [];
          // console.log("ooo", cart[0]);
          let items = cartData;
          for (let item of items) {
            if (item?.productId) {
              const { productName, price } = item.productId;
              const qty = item.count || 0;
              const total = qty * price;
              cartItem.push({
                productName,
                price,
                qty,
                total,
              });
            }
          }
          setCartItems(cartItem);

          const totalCount = cartItem.reduce((acc, cur) => acc + cur.qty, 0);
          // console.log("totalCount", totalCount);
          setCartItemsCount(totalCount);

          //console.log('CartItems: ', cartItems);
        } catch (err) {
          console.error("Error fetching cart items:", err);
        }
      }
    };
    fetchCartItems();
  }, [cart, setCart]);

  useEffect(() => {
    if (window.google && window.google.translate) {
      return;
    }
    // Define googleTranslateElementInit globally
    window.googleTranslateElementInit = function () {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "en,hi,bho",
          layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: true,
        },
        "google_translate_elementD"
      );
    };

    // Clean up function to remove script on unmount (optional)
    return () => {
      delete window.googleTranslateElementInit;
    };
  }, []);
  return (
    <>
      <div className="hidden w-full lg:block">
        <div className="border box-border flex flex-row items-center justify-between font-poppins px-[120px] w-full">
          <div className="flex flex-row items-center justify-start">
            <div id="google_translate_elementD"></div>
            <div className="border border-b-0  p-2.5 box-border">INDIA</div>
          </div>
          <div className="flex items-center justify-start">
            <div className="border border-b-0  p-2.5 box-border">
              <Link href="/account/contactus" className="">
                CONTACT US 
              </Link>
            </div>
            <div className="border border-b-0  p-2.5 box-border">
              <Link href="/account/newsletter" className="">
                NEWSLETTER
              </Link>
            </div>
            <div className="border border-b-0 p-2.5 box-border">
              <Link href="/account/faq" className="">
                FAQS
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row  items-center lg:justify-between gap-2 lg:gap-4 px-4 py-4 xl:px-[120px] lg:py-[10px] w-full border bg-white">
        <div className="flex  items-center justify-between order-1 gap-1.5 w-full h-full lg:w-auto">
          <div className="flex items-start h-full  gap-1">
            <span className="block lg:hidden ">
              <MobileMenu
                signInClick={signInClick}
                signOutClick={logout}
                isCart={isCart}
                setIsCart={setIsCart}
              />
            </span>
            <Link
              href="/"
              className="lg:font-bold uppercase text-base md:text-lg lg:text-3xl text-[#18181B]  font-poppins h-full"
            >
              <img
                src={"/images/logo/trialshoppy_mobile.svg"}
                width={232}
                height={44}
                alt="logo"
                className="hidden lg:block h-full w-full lg:min-w-[200px]"
              />
              <img
                src={"/images/logo/trialshoppy_mobile.svg"}
                width={80}
                height={25}
                alt="logo"
                className="block lg:hidden h-full w-full min-w-[150px]"
              />
            </Link>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between gap-2.5 order-2 lg:order-4">
          {authenticated.name && authenticated.token !== null ? (
            <>
              <div className="flex gap-4">
            
                <Link
                  href="/account/wishlist"
                  className="hidden lg:block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white"
                >
                  <AiOutlineHeart size={20} />
                  {wishListItems.length > 0 && (
                    <span className="absolute p-2.5 bottom-5 lg:top-14 ml-4 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {authenticated.user.wishList.length}
                    </span>
                  )}
                </Link>

                <div
                  className="max-lg:absolute max-lg:top-6 max-lg:right-8 max-lg:flex hidden lg:block border border-[#EB8105] px-[5px] lg:px-2.5 py-[5px] lg:py-2.5 bg-white transition-all hover:cursor-pointer rounded-md"
                  onClick={() => setIsCart(!isCart)}
                >
                  <MdOutlineShoppingCart size={20} />
                  {cartItems.length > 0 && (
                    <span className="absolute p-2.5 bottom-5 lg:top-14 ml-4 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                      {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                    </span>
                  )}
                </div>
                <Link
                  href="/account"
                  className="hidden lg:block border border-[#EB8105] rounded px-1 lg:px-2.5 py-1 lg:py-2.5  bg-white"
                >
                  <AiOutlineUser size={20} />
                </Link>
              </div>
              <button
                onClick={logout}
                className="hidden lg:block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins "
              >
                LOG OUT
              </button>
            </>
          ) : (
            <>
              {/* <div
                className="block border border-[#EB8105] px-[5px] lg:px-2.5 py-[5px] lg:py-2.5 bg-white transition-all hover:cursor-pointer rounded-md"
                onClick={() => setIsCart(!isCart)}
              >
                <MdOutlineShoppingCart size={20} />
                {cartItems.length > 0 && (
                  <span className="absolute top-14 ml-4 bg-red-500 text-white rounded-full w-4 h-4 flex items-center justify-center text-xs">
                    {cartItems.reduce((acc, curr) => acc + curr.qty, 0)}
                  </span>
                )}
              </div> */}
              {pathname !== "/account/login" && (
                <button
                  onClick={signInClick}
                  className="max-lg:absolute max-lg:top-6 max-lg:right-8 max-lg:flex hidden lg:block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins "
                >
                  LOG IN/SIGN UP
                </button>
              )}
            </>
          )}
        </div>

        <SearchBox />
      </div>
      <CategoryNavbar categories={categories} />
      {isCart && <Cart setIsCart={setIsCart} cartItems={cartItems} />}
      <Script
        type="text/javascript"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      ></Script>
    </>
  );
};

export default Header;
