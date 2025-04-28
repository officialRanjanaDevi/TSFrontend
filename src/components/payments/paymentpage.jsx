"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
import { UserContext } from "@/lib/UserContext";
import { CartContext } from "@/lib/cartProvider";
const Paymentpage = () => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const { buyNow } = useContext(CartContext);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [totalProductPrice, setTotalProductPrice] = useState(0);
  const [totalMRPPrice, setTotalMRPPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  const [subtotal, setSubtotal] = useState(0);
  const [personalCart, setPersonalCart] = useState(null);
  const [address, setAddress] = useState(null);
  const [totalCouponDiscount,setTotalCouponDiscount]=useState(0);
  const [totalDiscountPercentage,setTotalDiscountPercentage]=useState(0);
  const [selectedQuantity, setSelectedQuantity] = useState(
    buyNow?.quantity || 1
  );
  const [couponAppliedSuccess, setCouponAppliedSuccess] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      console.log("here it is", buyNow)
      if (buyNow.productDetails !== null) {
        setAddress(buyNow?.address);
        setCartItems([buyNow]);
        setLoading(false);
      } else if (
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
          setCartItems(data[0].items);
          setPersonalCart(data[0]);
          // console.log("personalCart", data[0]);
          setAddress(data[0]?.shippingAddress);
        } catch (error) {
          console.error("Error fetching cart items:", error);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchCartItems();
  }, [serverURL, authenticated.user?._id, buyNow]);

  useEffect(() => {
    console.log(buyNow,"hiii")
    let totalProductPrice = 0;
    let totalDiscount = 0;
    let totalMRPPrice = 0;
    let couponDiscount=0;
    let totalPercentage=0;
    // Calculate total product price and discount
    cartItems?.forEach((item) => {
      console.log("item ji", item);
      const selectedSize = item.size;

      const itemPrice =
        item.productDetails?.Size[selectedSize]?.trialshopyPrice ||
        item.productId?.Size[selectedSize]?.trialshopyPrice ||
        0;
      const itemMRP = item.productId?.Size[selectedSize]?.MRP || 0;
      const itemDiscount = item.productId?.discount || 0;
      const itemQuantity = item?.count || item?.quantity || 1;
      const couDiscount=buyNow?.coupon?.discount||0;
      totalProductPrice += itemPrice * itemQuantity;
      totalDiscount += itemMRP * itemQuantity - itemPrice * itemQuantity ;
      couponDiscount=(totalProductPrice*(couDiscount/100))
      totalMRPPrice += itemMRP * itemQuantity;
      totalPercentage=( (((couponDiscount+totalDiscount)/ totalMRPPrice)*100).toFixed(2))
    });

    // Calculate subtotal
    const subtotal = totalMRPPrice - totalDiscount-couponDiscount;

    // Update state
    setTotalMRPPrice(totalMRPPrice);
    setTotalProductPrice(totalProductPrice);
    setTotalDiscount(totalDiscount);
    setSubtotal(subtotal);
    setTotalCouponDiscount(couponDiscount);
    setTotalDiscountPercentage(totalPercentage);
  }, [cartItems]);

  const router = useRouter();

  const handleOpenRazorpay = async (data) => {
    try {
      const orderData = {
        products: cartItems.map((item, index) => ({
          product: item.productId?._id || item.productDetails?._id,
          quantity: item.count,
          orderStatus: "placed",
          finalPrice:
            item.productDetails?.Size[item.size]?.trialshopyPrice ||
            item.productId?.Size[item.size]?.trialshopyPrice,
          amount:
            item.productDetails?.price * item.quantity ||
            item.productId?.price * item.count,
          storeId: item.productId?.storeId,
          size: item.size,
          skuId: item.productId?.Size[item.size]?.SkuId,
          storeId: item?.productId?.storeId,
        })),
        totalPrice: data,
        shippingAddress: buyNow.address || personalCart.shippingAddress,
        status: "pending",
        currency: "INR",
        coupon:{
          couponType:buyNow.coupon.couponType,
          email:buyNow.coupon.email,
          studentId:buyNow.coupon.studentId,
          discount:buyNow.coupon.discount,
        }
      };
      // console.log("orderData", orderData);
      const newOrder = await axios.post(
        `${serverURL}/api/v1/${authenticated.user._id}/addOrder`,
        orderData
      );
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: Number(data * 100),
        currency: "INR",
        name: "Trialshopy Marketplace Pvt. Ltd.",
        description: "Created by Satyam Prakash",
        image: "/images/NameLogo.png",
        order_id: newOrder.data?.razorpayResponse?.id,
        handler: async function (response) {
          try {
            const res = await axios.put(
              `${serverURL}/api/v1/updateOrder/${newOrder.data.newOrder?._id}`,
              {
                payment: [
                  {
                    transactionId: response?.razorpay_payment_id,
                    totalAmount: data,
                    status: "success",
                  },
                ],
                status: "success",
              }
            );

            // console.log(res);
            router.push(
              `/checkout/confirmation?orderId=${newOrder.data.newOrder?._id}`
            );
          } catch (error) {
            console.error("Error processing payment success:", error);
            alert("Error processing payment");
          }
        },
        prefill: {
          name: `${authenticated.user?.name}`,
          email: `${authenticated.user?.email}`,
          contact: `${authenticated.user?.phone_number}`,
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

      paymentObject.on("payment.failed", async function (response) {
        alert("Payment failed. Please try again. Contact support for help");
        const res = await axios.put(
          `${serverURL}/api/v1/updateOrder/${newOrder.data.newOrder._id}`,
          {
            payment: [
              {
                transactionId: response?.razorpay_payment_id,
                totalAmount: data,
                status: "failed",
              },
            ],
            status: "failed",
          }
        );
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };


  return (
    <>
      <div className="flex flex-col my-3 justify-center items-center">
        <Image
          height={150}
          width={150}
          alt="Logo"
          src="/images/NameLogo.png"
          className="block"
        ></Image>
        <div className="flex">
          <h3 className="text-[#7C7C7C] font-poppins ml-[2px] text-[14px] sm:text-[17px] ">
            SHOPPING CART
          </h3>
          <hr className="border border-dashed md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />
          <div className="">
            <h3 className="text-[#EB8105] font-semibold font-poppins ml-[2px]   text-[14px] sm:text-[17px] ">
              PAYMENT
            </h3>
            <hr className=" border-[#EB8105] border-[1.5px] w-full  mt-[1px] " />
          </div>

          <hr className="border border-dashed  md:w-[100px] ml-[4px] mt-[12.5px] border-[#7C7C7C]" />

          <div>
            <h3 className=" text-[#7C7C7C]  font-poppins ml-[4px] text-[14px] sm:text-[17px] ">
              CONFIRMATION
            </h3>
          </div>
        </div>
      </div>

      <div className="px-3 md:px-[120px] xl:mx-[200px] mt-[10px] flex flex-col md:flex-row overflow-hidden">
        <div className="w-full">
          <div className="relative ">
            <div className="flex">
              <div className="flex mt-[20px]">
                <div className="">
                  <div className="flex gap-1">
                    <h4 className="font-thin">Deliver to: </h4>
                    <h4 className="font-light">{address?.fullName}</h4>
                  </div>
                  <div className="mt-1 font-thin">
                    <p>
                      {address
                        ? `${address.landmark}, ${address.addressLine}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`
                        : ""}
                    </p>
                    <p>Contact : {address ? `${address.PhoneNumber}` : ""}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <h3 className="font-normal text-[#7C7C7C] text-[13px] ml-[10px] mt-[15px]">
            Prices Detail({cartItems.length} item)
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
                {totalMRPPrice}
              </h3>
              <h3 className="font-poppins font-normal text-[14px] text-[#059669]">
                -₹{" "}
                {totalDiscount}
              </h3>
              <h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer">
                -{totalCouponDiscount}₹
              </h3>
              <h3 className="font-poppins font-normal text-[14px] text-[#DC2626] cursor-pointer">
                - {totalDiscountPercentage}%
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
              <h3>₹ {subtotal}</h3>
            </div>
          </div>

          <button
            className="w-full px-3 py-2 my-5 text-center rounded bg-gradient-to-b from-primary to-secondary"
            onClick={() => handleOpenRazorpay(subtotal.toFixed(2))}
          >
            Pay Now
          </button>
          <Link href="/checkout/confirmation"></Link>

          <hr className="mt-[20px]" />
        </div>
      </div>
    </>
  );
};

export default Paymentpage;
