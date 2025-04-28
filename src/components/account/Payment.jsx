"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { MdAdd } from "react-icons/md";

const gpay = "/images/payments/gpay.svg";
const creditCard = "/images/payments/creditCard.svg";
const phonepe = "/images/payments/phonepe.svg";
const paytm = "/images/payments/paytm.svg";
const paypal = "/images/payments/paypal.svg";
const MDIBank = "/images/payments/MDIBank.svg";

export default function Payment() {
  const [selectedMethod, setSelectedMethod] = useState(null);

  const payment_methods = [
    {
      id: 1,
      method: "Credit Card",
      image: creditCard,
      fields: ["Card Number", "Card Owner Name", "Expiry Date", "CVV/CV2"],
    },
    {
      id: 2,
      method: "PhonePe",
      image: phonepe,
      fields: ["Name@PhonePe"],
    },
    {
      id: 3,
      method: "Google Pay",
      image: gpay,
      fields: ["Card Number", "Card Owner Name", "Expiry Date", "CVV/CV2"],
    },
    {
      id: 4,
      method: "Paytm",
      image: paytm,
      fields: ["Card Number", "Card Owner Name", "Expiry Date", "CVV/CV2"],
    },
    {
      id: 5,
      method: "PayPal",
      image: paypal,
      fields: ["Customer ID", "Password"],
    },
    {
      id: 6,
      method: "Netbanking",
      image: MDIBank,
      fields: ["Customer ID", "Password"],
    },
  ];

  const handleSubmit = () => {
    // You can display a pop-up or toast message to show "Thanks for submitting"
    alert("Thanks for submitting!");
  };

  const getFormFields = () => {
    switch (selectedMethod) {
      // Inside the getFormFields function
      case "Credit Card":
        return (
          <>
            <div className="flex items-center gap-2">
              {/* <Image
								width={25}
								height={25}
								src={creditCard}
								alt="Credit Card"
								className="w-7 h-7"
							/> */}
              {/* <div className="font-medium text-black flex-grow-1">
								Credit/Debit card
							</div> */}
              {/* <Link
								href="#"
								className="flex items-center bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-3 py-1 rounded text-white">
								Add <MdAdd className="mx-1" />
							</Link> */}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Card Owner Name"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="CVV/CV2"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
          </>
        );
      // Inside the getFormFields function
      case "PhonePe":
        return (
          <>
            <div className="flex items-center gap-2">
              {/* <Image
								width={25}
								height={25}
								src={phonepe}
								alt="PhonePe"
								className="w-7 h-7"
							/>
							<div className="font-medium text-black flex-grow-1">PhonePe</div> */}
              {/* <Link
								href="#"
								className="flex items-center bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-3 py-1 rounded text-white">
								Add <MdAdd className="mx-1" />
							</Link> */}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Name@PhonePe"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
          </>
        );
      case "Google Pay":
        return (
          <>
            <div className="flex items-center gap-2">
              {/* <Image
								width={25}
								height={25}
								src={gpay}
								alt="Google Pay"
								className="w-7 h-7"
							/>
							<div className="font-medium text-black flex-grow-1">
								Google Pay
							</div> */}
              {/* <Link
								href="#"
								className="flex items-center bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-3 py-1 rounded text-white">
								Add <MdAdd className="mx-1" />
							</Link> */}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Card Owner Name"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="CVV/CV2"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
          </>
        );
      case "Paytm":
        return (
          <>
            <div className="flex items-center gap-2">
              {/* <Image
								width={25}
								height={25}
								src={paytm}
								alt="Paytm"
								className="w-7 h-7"
							/>
							<div className="font-medium text-black flex-grow-1">Paytm</div> */}
              {/* <Link
								href="#"
								className="flex items-center bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-3 py-1 rounded text-white">
								Add <MdAdd className="mx-1" />
							</Link> */}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Card Number"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Card Owner Name"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Expiry Date"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="CVV/CV2"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
          </>
        );
      case "PayPal":
        return (
          <>
            <div className="flex items-center gap-2">
              {/* <Image
								width={25}
								height={25}
								src={paypal}
								alt="PayPal"
								className="w-7 h-7"
							/>
							<div className="font-medium text-black flex-grow-1">PayPal</div> */}
              {/* <Link
								href="#"
								className="flex items-center bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-3 py-1 rounded text-white">
								Add <MdAdd className="mx-1" />
							</Link> */}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Customer ID"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
          </>
        );
      case "Netbanking":
        return (
          <>
            <div className="flex items-center gap-2">
              {/* <Image
								width={25}
								height={25}
								src={MDIBank}
								alt="Netbanking"
								className="w-7 h-7"
							/>
							<div className="font-medium text-black flex-grow-1">
								Netbanking
							</div> */}
              {/* <Link
								href="#"
								className="flex items-center bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-3 py-1 rounded text-white">
								Add <MdAdd className="mx-1" />
							</Link> */}
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-grow-1">
                <input
                  type="text"
                  placeholder="Customer ID"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
              <div className="flex-grow-1">
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full p-2 text-gray-500 bg-white border border-gray-300 rounded"
                />
              </div>
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div className="px-2">
        <div className="text-lg font-medium">Payment Method</div>
        {payment_methods?.map((item) => {
          return (
            <div
              key={item.id}
              className={`my-3 flex flex-row justify-between ${
                selectedMethod == item.method ? "flex-col" : "flex-row"
              }`}
            >
              <div className="flex flex-row items-center w-full">
                <Image
                  width={25}
                  height={25}
                  src={item.image}
                  alt={item.method}
                  className="w-7 h-7"
                />
                <div className="mx-2">{item.method}</div>
              </div>
              {selectedMethod && selectedMethod == item.method ? (
                <div className="flex flex-col gap-3 my-3">
                  {getFormFields()}
                  <div className="flex items-center gap-2">
                    <button
                      className="bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-4 py-2 rounded text-white"
                      onClick={handleSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              ) : (
                <Link
                  href="#"
                  className="flex flex-row items-center bg-gradient-to-b from-[#EB8105] to-[#FAAC06] px-3 py-1 rounded text-white"
                  onClick={() => setSelectedMethod(item.method)}
                >
                  Add <MdAdd className="mx-1" />
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
