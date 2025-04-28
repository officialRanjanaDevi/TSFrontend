import React from "react";
import Link from "next/link";

function Faq() {
  return (
    <>
      <div className=" md:w-60 lg:w-80 flex-row border">
        <h1 className=" text-[#EB8105] text-lg mt-5 px-3 ">Top queries</h1>
        <div className=" mt-3 px-3">
          <Link href="/account/terms&conditions" className=" ">
            Terms and conditions
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=order" className=" ">
            Shipping, Order Tracking & Delivery
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=cancellationsAndModifications" className=" mt-2">
            Cancellations and Modifications
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/login" className="">
            Sign Up and Login
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/payments" className="">
            Payments
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=credit" className="">
            Trailshopy Credit
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=phonePeWallet" className="">
            PhonePe Wallet
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=giftCard" className="">
            Gift Cards
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=giftWrapping" className="">
            Gift Wrapping
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/policy" className="">
            E-mail verification policy
          </Link>
        </div>

        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=donation" className="">
            Donations
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=ecomTransaction" className="">
            Enable Ecom Transactions
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=cardTokenization" className="">
            Card Tokenization
          </Link>
        </div>

        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=creditCard" className="">
            Trailshopy Kotak Credit Card
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=cashbackRecovery" className="">
            Instant Cashback Recovery
          </Link>
        </div>

        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=fineJewellery" className="">
            Fine Jewellery
          </Link>
        </div>
        <div className=" mt-3 px-3">
          <Link href="/account/faq?q=openBoxDelivery" className="">
            Open Box Delivery
          </Link>
        </div>
      </div>
    </>
  );
}

export default Faq;
