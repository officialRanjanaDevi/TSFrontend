"use client";
import React, { useState, useEffect, useContext, useCallback } from "react";
import { UserContext } from "@/lib/UserContext";
import axios from "axios";
import PaymentProductCard from "./paymentproductcard";
import Image from "next/image";
import OfferCard from "./offercard";
import SimilarProductCard from "../productDetails/SimilarProductCard";
import { useRouter, useSearchParams } from "next/navigation";
import { CartContext } from "@/lib/cartProvider";
import { LocationContext } from "@/lib/LocationContext";
import AddressForm from "./AddressForm.";
import Loading from "../common/Loading";
import CartItemCard from "../cart/CartItemCard";
import Link from "next/link";

const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

const ShoppingCart = () => {
  const router = useRouter();
  const [location, setLocation] = useContext(LocationContext);
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const { buyNow, setBuyNow } = useContext(CartContext);
  const [cart, setCart] = useState([]);
  const [selectedQuantity, setSelectedQuantity] = useState(
    buyNow?.quantity || 1
  );
  const [coupons, setCoupons] = useState([]);
  const [couponSelected, setCouponSelected] = useState(null);
  const [couponType, setCouponType] = useState("coupon");
  const [couponDiscount, setCouponDiscount] = useState("");
  const [couponInputValue, setCouponInputValue] = useState("");

  const [couponApplied, setCouponApplied] = useState(null);
  const [couponFailed, setCouponFailed] = useState(false);
  const [couponAppliedSuccess, setCouponAppliedSuccess] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);
  const [address, setAddress] = useState(null);
  const [newAddress, setNewAddress] = useState(false);
  const [showAddressAlert, setShowAddressAlert] = useState(false);
  const [addressEdit, setAddressEdit] = useState(false);
  const [currentAddress, setCurrentAddress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalMRPPrice, setTotalMRPPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [schoolId, setSchoolId] = useState(null);
  const [schoolImage, setSchoolImage] = useState("");
  const [currentLocation,setCurrentLocation]=useState(false);
  
  // console.log("buyNow", buyNow);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (
        authenticated.user &&
        authenticated.user._id &&
        authenticated.user._id !== null
      ) {
        try {
          const customerId = authenticated.user?._id;
          const response = await axios.get(
            `${serverURL}/api/v1/cart/${customerId}`
          );
          const data = response.data;
          const filteredItems = data[0].items.filter((item) => item.productId);
          setCartItems(filteredItems);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCartItems();
  }, [serverURL, authenticated.user?._id]);

  useEffect(() => {
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalMRPPrice = 0;

    // Calculate total product price and discount
    cartItems?.forEach((item) => {
      const selectedSize = item.size;
      const itemMRP = item.productId?.Size[selectedSize]?.MRP || 0;
      const itemPrice =
        item.productId?.Size[selectedSize]?.trialshopyPrice || 0;
      const itemDiscount = item.productId?.discount || 0;
      const itemQuantity = item?.count || 1;

      totalProductPrice += itemPrice * itemQuantity;
      totalDiscount += itemMRP * itemQuantity - itemPrice * itemQuantity;
      totalMRPPrice += itemMRP * itemQuantity;
    });

    // Calculate subtotal
    const subtotal = totalProductPrice;

    // Update state
    setTotalMRPPrice(totalMRPPrice);
    setTotalProductPrice(totalProductPrice);
    setTotalDiscount(totalDiscount);
    setSubtotal(subtotal);
  }, [cartItems]);

  const updateTotalPrices = () => {
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalMRPPrice = 0;

    // Calculate total product price and discount
    cartItems.forEach((item) => {
      const { productId, size } = item;
      const selectedSize = size;
      const itemPrice = productId?.price || 0;
      const itemDiscount = productId?.discount || 0;
      const itemQuantity = productId?.quantity || 1;
      const itemMRP = productId?.Size[selectedSize]?.MRP || 0;

      totalProductPrice += itemPrice * itemQuantity;
      totalDiscount += itemMRP * itemQuantity - itemPrice * itemQuantity;
      totalMRPPrice += itemMRP * itemQuantity;
    });

    const subtotal = totalProductPrice;

    setTotalMRPPrice(totalMRPPrice);
    setTotalProductPrice(totalProductPrice);
    setTotalDiscount(totalDiscount);
    setSubtotal(subtotal);
  };
  // console.log(cartItems)
  const signInClick = () => {
    router.push("/account/login");
  };

  const handleCouponSelected = (coupon) => {
    setCouponSelected(coupon);
    setCouponInputValue(coupon.code);
    setCouponAppliedSuccess(false);
    setCouponFailed(false);
  };

  const handleCouponApply = async () => {
    if (couponType === "coupon") {
      const selectedCoupon = coupons.find(
        (coupon) => coupon.code === couponInputValue
      );
      if (selectedCoupon) {
        setCouponApplied(selectedCoupon);
        setCouponAppliedSuccess(true);
        setCouponFailed(false);
      } else {
        setCouponAppliedSuccess(false);
        setCouponFailed(true);
      }
    } else if (couponType === "itsector" || couponType === "college") {
      try {
        console.log(couponInputValue);
        const couponUrl = `${serverURL}/api/v1/verifyDomain/${couponType}`;
        const response = await axios.post(couponUrl, {
          email: couponInputValue,
        });
        if (response) {
          setCouponDiscount(response.data.discount);
          setCouponAppliedSuccess(true);
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const formData = new FormData();
        formData.append("schoolId", schoolId);
        const userId = authenticated.user._id;
        const couponUrl = `${serverURL}/api/v1/uploadID/${couponType}/${userId}`;

        const response = await axios.post(couponUrl, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setSchoolImage(response.data.response.schoolId.url);
        setCouponDiscount(response?.data?.discount?.discount);
        setCouponAppliedSuccess(true);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (couponType !== "school") {
      return;
    }
    const fetchSchoolCoupon = async () => {
      try {
        const userId = authenticated.user._id;
        const couponUrl = `${serverURL}/api/v1/getSchoolId/${couponType}/${userId}`;

        const response = await axios.get(couponUrl);
        console.log(response);
        setSchoolImage(response.data.response.schoolId.url);
        setCouponDiscount(response.data.discount[0].discount);
        setCouponAppliedSuccess(true);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSchoolCoupon();
  }, [couponType]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl3 = `${serverURL}/api/v1/products`;
        const response = await axios.post(`${apiUrl3}`, {
          filters: { categories: buyNow?.productDetails?.categories },
        });

        setSimilarProducts(response.data.data);
        // console.log("Similar product: ", response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    if (buyNow) {
      fetchData();
    }
  }, [buyNow]);
  // console.log(buyNow, "buyNow from shoppinhcart.jsx");

  useEffect(() => {
    const fetchCoupons = async () => {
      if (couponType === "coupon") {
        try {
          const couponUrl = `${serverURL}/api/v1/coupons/getAll`;
          const response = await axios.get(couponUrl);
          setCoupons(response.data);
        } catch (error) {
          console.error(error);
        }
      }
    };

    fetchCoupons();
  }, [couponType]);
  const customerAddress = async () => {
    if (
      authenticated.user &&
      authenticated.user._id &&
      authenticated.user._id !== null
    ) {
      try {
        const CustomerAddressUrl = `${serverURL}/api/v1/address/${
          authenticated.user.role == "customer"
            ? "user"
            : authenticated.user.role
        }/${authenticated.user._id}`;
        const res = await axios.get(CustomerAddressUrl);
        setAddress(res.data);
        // setAddress(res.data[res.data.length ? res.data.length - 1 : 0]);
        console.log("address", res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {


    customerAddress();
  }, [newAddress, authenticated.user._id, authenticated.user.role]);

  const handlePlaceOrder = () => {
    if (!currentAddress) {
      console.log("Address not present, setting showAddressAlert to true");
      setShowAddressAlert(true);
    } else {
      const api = `${serverURL}/api/v1/cart/updateCartAddress/${authenticated.user?._id}`;
      axios
        .put(api, {
          shippingAddress: currentAddress._id,
        })
        .then((res) => {
          setBuyNow({
            ...buyNow,
            address: res.data.shippingAddress,
            coupon: {
              couponType: couponType,
              discount: couponDiscount,
              email: couponInputValue,
              schoolId: schoolImage,
            },
          });
          console.log(buyNow);
          router.push("/checkout/payment");
        })
        .catch((err) => console.error(err));
    }
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
  };

  const handleAdressSubmit = () => {
    setNewAddress(false);
    setAddressEdit(false);
  };

  const deleteAddress = async (id) => {
    try {
      const deleteAddressUrl = `${serverURL}/api/v1/address/${id}`;
      await axios.delete(deleteAddressUrl);
      customerAddress();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (buyNow.productDetails) {
      setLoading(false);
    }
  }, []);

  const price = totalMRPPrice || 0;
  const discount = totalDiscount || 0;
  const CouponDiscount = couponApplied?.discount || couponDiscount;
  console.log(CouponDiscount)
  const TotalCouponDiscount =
    price > 0
      ? couponAppliedSuccess
        ? Number(((CouponDiscount * (price - discount)) / 100).toFixed(2))
        : 0
      : 0;

  const discountPercentage =
    price > 0
      ? couponAppliedSuccess
        ? (((discount + TotalCouponDiscount) / price) * 100).toFixed(2)
        : ((discount / price) * 100).toFixed(2)
      : "0";

  const TotalPrice = totalMRPPrice - totalDiscount - TotalCouponDiscount;
  useEffect(() => {
    setFinalPrice(TotalPrice);
  }, [couponType]);

  const handleLocationChange=(e)=>{
    const { name, value } = e.target;
    setLocation((prevLocation) => ({
      ...prevLocation,
      [name]: value,
    }));
  }
  return loading ? (
    <Loading />
  ) : (
    <>
      {cart && (buyNow.productDetails || cartItems.length > 0) ? (
        <div className="w-full overflow-x-hidden md:mx-10 lg:mx-36 ">
          <div className="flex flex-col md:flex-row md:px-0 px-4 lg:justify-center ">
            <div className="w-full flex-col lg:w-[62%] py-4">
              <div className="w-full">
                <div className="">
                  {location?currentLocation?
                  <div className="relative">

                    <AddressForm
                    Address={currentAddress}
                    onAddressSubmit={handleAdressSubmit} 
                    isEditEnabled={false} 
                    user={authenticated.user}
                  />
                  <Image
                        className="absolute top-2 right-2 cursor-pointer"
                        src="/images/x.svg"
                        alt="Close"
                        width={20}
                        height={20}
                        onClick={() => setCurrentLocation(false)} 
                      />
                  </div>
             
         
                  :
                  
                    <div className="relative ">
                         <div className="flex ">
                         <input
                          type="radio"
                          name="address"
                          id="address1"
                          className="mr-2"
                          onClick={() => setCurrentAddress(true)}
                        />
                        <h4 className="font-thin text-lg"> Deliver to: </h4>
                        <p>{location.fullName}</p>
                      </div>
                   
                      <p className="ml-4"> {location.addressLine}</p>
                      <div className="absolute flex justify-start top-6 right-4  gap-2">
                        <Image
                          height={20}
                          width={20}
                          alt="Pen"
                          src="/images/pen.svg"
                          className=""
                          onClick={() => {
                            setCurrentLocation(true);
                            setCurrentAddress(location);
                          }}
                        />
                        <Image
                          height={20}
                          width={20}
                          alt="Pen"
                          src="/images/bin.svg"
                          className=""
                          onClick={() => {
                            deleteAddress();
                          }}
                        />
                      </div>
                    </div>:<></>

                    
                  }
                  



                  {address &&
                    !addressEdit &&
                    address.map((item, index) => (
                      <div className="" key={index}>
                        <div
                          className={`flex items-center text-sm  ${
                            newAddress ? "hidden" : ""
                          }`}
                        >
                          <div className="w-full">
                            <div className="relative ">
                              <div htmlFor="address1" className="text-lg flex">
                                <div className="flex mt-[20px]">
                                  <div>
                                    <input
                                      type="radio"
                                      name="address"
                                      id="address1"
                                      className="mr-2"
                                      onClick={() => setCurrentAddress(item)}
                                    />
                                  </div>
                                  <div className="">
                                    <div className="flex gap-1">
                                      <h4 className="font-thin">
                                        Deliver to:{" "}
                                      </h4>
                                      <h4 className="font-bold">
                                        {item.fullName}
                                      </h4>
                                    </div>
                                    <div>
                                      <p className="mt-1">
                                        {address
                                          ? `${item.landmark}, ${item.addressLine}, ${item.city}, ${item.state}, ${item.pincode}, ${item.country}`
                                          : ""}
                                      </p>
                                      <p>
                                        Contact :{" "}
                                        {address ? `${item.PhoneNumber}` : ""}
                                      </p>
                                    </div>
                                  </div>
                                </div>

                                <div className="absolute flex justify-start top-6 right-4  gap-2">
                                  <Image
                                    height={20}
                                    width={20}
                                    alt="Pen"
                                    src="/images/pen.svg"
                                    className=""
                                    onClick={() => {
                                      setAddressEdit(true);
                                      setCurrentAddress(item);
                                    }}
                                  />
                                  <Image
                                    height={20}
                                    width={20}
                                    alt="Pen"
                                    src="/images/bin.svg"
                                    className=""
                                    onClick={() => {
                                      deleteAddress(item._id);
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  {authenticated.name &&
                    authenticated.token !== null &&
                    !newAddress &&
                    !addressEdit && (
                      <Image
                        height={100}
                        width={100}
                        src="/images/AddNew.svg"
                        alt="Add New"
                        className="cursor-pointer"
                        onClick={() => setNewAddress(true)} // Show address form when clicked
                      />
                    )}

                  {newAddress && (
                    <div className="relative mt-2">
                      <AddressForm
                        onAddressSubmit={handleAdressSubmit} // Handle address submission
                        isEditEnabled={false} // New form is blank
                        user={authenticated.user}
                      />
                      <Image
                        className="absolute top-2 right-2 cursor-pointer"
                        src="/images/x.svg"
                        alt="Close"
                        width={20}
                        height={20}
                        onClick={() => setNewAddress(false)} // Close the form without submitting
                      />
                    </div>
                  )}
                  {addressEdit && (
                    <div className={`flex flex-col relative mt-2`}>
                      {authenticated.user._id && (
                        <AddressForm
                          onAddressSubmit={handleAdressSubmit}
                          isEditEnabled={true}
                          Address={currentAddress}
                          user={authenticated.user}
                        />
                      )}
                      <Image
                        className=" ml-[80px] sm:ml-[90px] lg:ml-[30px]  mb-auto absolute end-20"
                        src="/images/x.svg"
                        alt="Image"
                        width={20}
                        height={20}
                        onClick={handleAdressSubmit}
                      />
                    </div>
                  )}
                </div>

                {/* {user._id && <Address  onAddressChange={handleAddressChange} />} */}
                {!authenticated.user._id && (
                  <button
                    onClick={signInClick}
                    className="block rounded py-[5px] lg:py-2.5 px-[10px] lg:px-4 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-[10px] lg:text-sm lg:w-52 text-black text-center font-semibold  font-poppins "
                  >
                    LOG IN/SIGN UP
                  </button>
                )}

                <hr className="mt-[5px] w-full "></hr>
                <div className="relative">
                  {buyNow.productDetails !== null ? (
                    <div className="w-full flex-row relative">
                      <div className="mt-[30px] flex">
                        <div className="w-full">
                          <PaymentProductCard
                            productDetails={buyNow.productDetails}
                            onQuantityChange={(newQuantity) => {
                              setSelectedQuantity(newQuantity);
                              setBuyNow({ ...buyNow, quantity: newQuantity });
                            }}
                            quantityNumber={buyNow?.quantity}
                            selectedSize={buyNow?.size}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    cartItems?.length > 0 && (
                      <>
                        <div className="w-full">
                          {cartItems
                            ?.filter((item) => item.productId)
                            ?.map((item) => {
                              // console.log("item from shoppingcart.jsx", item);
                              return (
                                <CartItemCard
                                  product={item}
                                  key={item._id}
                                  updateCartItem={handleCartItemUpdate}
                                  // updateCartItem={(updatedItem) => {
                                  //   const updatedCartItems = cartItems.map(
                                  //     (cartItem) =>
                                  //       cartItem._id === updatedItem._id
                                  //         ? updatedItem
                                  //         : cartItem
                                  //   );
                                  //   setCartItems(updatedCartItems);
                                  //   updateTotalPrices(); // Update total prices when a cart item is updated
                                  // }}
                                  setCartItems={setCartItems}
                                  //removeCartItem={removeCartItem}
                                  updateTotalPrices={updateTotalPrices} // Pass the callback to update total prices
                                />
                              );
                            })}
                        </div>
                      </>
                    )
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col w-full md:w-2/5 lg:w-2/5 md:ps-[1%]">
              <div className="w-full ">
                <div className="flex justify-between">
                  <h3
                    onClick={() => {
                      setCouponAppliedSuccess(false);
                      setCouponDiscount(0);
                      setCouponType("coupon");
                    }}
                    className={`${
                      couponType === "coupon" ? "underline text-amber-500" : ""
                    } font-normal cursor-pointer  text-[#7C7C7C]`}
                  >
                    Coupons
                  </h3>
                  <h3
                    onClick={() => {
                      setCouponAppliedSuccess(false);
                      setCouponDiscount(0);
                      setCouponType("college");
                    }}
                    className={`${
                      couponType === "college"
                        ? "underline text-amber-500 "
                        : ""
                    } font-normal cursor-pointer  text-[#7C7C7C]`}
                  >
                    College Email
                  </h3>
                  <h3
                    onClick={() => {
                      setCouponAppliedSuccess(false);
                      setCouponDiscount(0);
                      setCouponType("itsector");
                    }}
                    className={`${
                      couponType === "itsector"
                        ? "underline text-amber-500 "
                        : ""
                    } font-normal cursor-pointer  text-[#7C7C7C]`}
                  >
                    IT Sector
                  </h3>
                  <h3
                    onClick={() => {
                      setCouponAppliedSuccess(false);
                      setCouponDiscount(0);
                      setCouponType("school");
                    }}
                    className={`${
                      couponType === "school" ? "underline text-amber-500 " : ""
                    } font-normal cursor-pointer  text-[#7C7C7C]`}
                  >
                    School Id
                  </h3>
                </div>

                <div className="relative flex w-full mt-[10px]">
                  {couponType === "school" ? (
                    schoolImage ? (
                      <div className="relative group">
                        <img
                          src={schoolImage}
                          alt="School ID"
                          className="z-0 h-32 w-40  transition-opacity duration-300"
                        />
                        <button
                          onClick={() => {
                            setCouponAppliedSuccess(false);
                            setCouponDiscount(0);
                            setSchoolImage("");
                          }}
                          className="absolute top-0 left-0 h-32 w-40 flex items-center justify-center bg-black/50  text-white font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        >
                          Update School ID
                        </button>
                      </div>
                    ) : (
                      <div className="relative w-full flex flex-col">
                        <input
                          type="file"
                          className="rounded py-2 w-full ps-2 border border-orange-500"
                          onChange={(e) => setSchoolId(e.target.files[0])}
                        />
                        <p className="text-red-500 text-sm">
                          <span className="text-black">Note: </span>In case of
                          fake school Id, seller can reject your order.{" "}
                        </p>
                        <button
                          onClick={handleCouponApply}
                          className="absolute rounded w-fit px-2 py-1 h-fit top-2 right-10 bottom-2 mr-[-30px] flex items-center justify-center bg-orange-500 text-white"
                        >
                          Apply
                        </button>
                      </div>
                    )
                  ) : (
                    <>
                      <input
                        type="text"
                        className="rounded py-2 w-full ps-2 border border-orange-500"
                        value={couponInputValue}
                        onChange={(e) => setCouponInputValue(e.target.value)}
                      />
                      <button
                        onClick={handleCouponApply}
                        className="absolute rounded w-fit px-2 py-1 top-2 right-10 bottom-2 mr-[-30px] flex items-center justify-center bg-orange-500 text-white"
                      >
                        Apply
                      </button>
                    </>
                  )}
                </div>
                {couponFailed && (
                  <p className="text-[red] text-[12px]">
                    Coupon code {couponInputValue} not found. Please check and
                    try again.
                  </p>
                )}
                {couponAppliedSuccess && (
                  <p className="text-[green] text-[12px]">
                    Coupon code {couponInputValue} applied successfully!
                  </p>
                )}
                {couponType === "coupon" ? (
                  <>
                    <div className="flex flex-row items-center w-[250px] mt-[10px]">
                      <Image
                        className="mr-1"
                        src="/images/Percent.svg"
                        alt="Image"
                        width={20}
                        height={20}
                      />
                      Available offers
                    </div>
                    <div className="max-h-[250px] overflow-x-hidden overflow-y-auto">
                      {coupons && (
                        <div>
                          {coupons.map((coupon, index) => (
                            <div
                              className="mt-[10px] offer-card" // Add the offer-card class here
                              key={index}
                              // Call handleCouponSelected with the current coupon
                            >
                              <OfferCard
                                coupon={coupon}
                                handleCouponSelected={handleCouponSelected}
                              />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* price section */}

              <div className="w-full ">
                <hr className="my-5 w-full" />

                <h3 className="font-normal text-[#7C7C7C] text-[13px] ml-[10px] mt-[15px]">
                  Prices Detail({selectedQuantity})
                </h3>

                <div className="flex justify-between my-5">
                  <div className="flex flex-col items-start justify-start ml-[10px] gap-3">
                    <h3 className="font-poppins font-thin text-[14px]">
                      TOTAL MRP
                    </h3>
                    <h3 className="font-poppins font-thin text-[14px]">
                      Discount on MRP
                    </h3>
                    <h3 className="font-poppins font-thin text-[14px]">
                      Coupon Discount
                    </h3>
                    <h3 className="font-poppins font-thin text-[14px]">
                      Total Discount
                    </h3>

                    <div className="flex">
                      <h3 className="font-poppins font-thin text-[14px]">
                        Convivence Fee
                      </h3>
                      <h3 className="font-poppins text-[#EB8105] font-normal pt-[1.5px] text-[13px] ml-[4px] cursor-pointer">
                        Know More
                      </h3>
                    </div>
                  </div>
                  <div className="flex flex-col mr-[20px] items-end justify-end gap-3">
                    <h3 className="font-poppins font-normal text-[14px]">
                      ₹{" "}
                      {buyNow?.productDetails?.Size[buyNow.size]?.MRP
                        ? buyNow?.productDetails?.Size[buyNow.size]?.MRP *
                          selectedQuantity
                        : totalMRPPrice.toFixed(2)}
                    </h3>
                    <h3 className="font-poppins font-normal text-[14px] text-[#059669]">
                      -₹{" "}
                      {buyNow?.productDetails
                        ? couponAppliedSuccess
                          ? (
                              buyNow?.productDetails?.discount +
                              (buyNow?.productDetails?.price *
                                couponApplied.discount) /
                                100
                            ).toFixed(2) * selectedQuantity
                          : buyNow?.productDetails?.Size[buyNow.size]?.MRP *
                              selectedQuantity -
                            buyNow?.productDetails?.Size[buyNow.size]
                              ?.trialshopyPrice *
                              selectedQuantity
                        : Number(totalDiscount.toFixed(2)).toFixed(2)}
                    </h3>
                    <h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer">
                      -₹ {TotalCouponDiscount}
                    </h3>
                    <h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer">
                      - {discountPercentage}%
                    </h3>

                    <h3 className="font-poppins font-normal text-[14px]">
                      Free
                    </h3>
                  </div>
                </div>

                <hr className="mt-[20px]" />

                <div className="flex justify-between my-5">
                  <div className="flex flex-col items-start justify-start ml-[10px] gap-3">
                    <h3 className="font-normal">Total Amount</h3>
                  </div>
                  <div className="flex font-normal flex-col mr-[20px] items-end justify-end gap-3">
                    <h3>₹ {TotalPrice}</h3>
                  </div>
                </div>

                {authenticated.user._id && (
                  <>
                    <button
                      onClick={handlePlaceOrder}
                      className="mx-auto block w-3/4 md:w-full py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary"
                    >
                      Place Order
                    </button>
                    {showAddressAlert && (
                      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
                        <div className="bg-white p-6 rounded-md shadow-md">
                          <p className="text-lg font-semibold mb-4">
                            Please add or Choose an address first.
                          </p>
                          <button
                            onClick={() => setShowAddressAlert(false)}
                            className="bg-blue-500 text-black px-5 py-2 rounded-md bg-gradient-to-b from-primary to-secondary"
                          >
                            Ok
                          </button>
                        </div>
                      </div>
                    )}
                  </>
                )}
                {!authenticated.user._id && (
                  <button
                    onClick={signInClick}
                    className="mx-auto block w-3/4 md:w-full py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary"
                  >
                    Login To place an order
                  </button>
                )}
                <hr className="mt-[20px]" />
              </div>
            </div>
          </div>
          <div className="w-full mt-5 mb-[] overflow-auto md:m-0 grid-container ">
            {similarProducts && similarProducts.length ? (
              <div className="flex items-center justify-between w-full gap-4 md:gap-8 min-w-max">
                {similarProducts.map((product, index) => (
                  <SimilarProductCard key={index} productDetails={product} />
                ))}
              </div>
            ) : (
              <p>No Products to show!</p>
            )}
          </div>
        </div>
      ) : (
        <div className="min-h-[50vh] w-full py-3 lg:py-5 flex flex-col items-center justify-center">
          <Image
            width={20}
            height={20}
            alt="empty_cart"
            loading="eager"
            unoptimized={true}
            src={"/images/cart/Empty_box.gif"}
            className="w-[70vw] md:w-[40vw] lg:w-[20vw] m-auto"
          />
          <div className="text-center">Looks like your cart is empty!</div>
          <Link
            href="/"
            className="px-4 py-2 my-3 rounded bg-gradient-to-b from-primary to-secondary"
          >
            Go Home
          </Link>
        </div>
      )}
    </>
  );
};

export default ShoppingCart;
