import React from "react";
import Link from "next/link";
const Footer = () => {
  return (
    <>
      <div className="border-t border-gray-400 lg:border-t-2 lg:border-gray-800 w-full h-489 flex flex-col items-center px-10.5 py-0 gap-6.25 left: calc(50% - 1549.5px) bottom-5">
        <div className="flex flex-col items-center w-full gap-4 px-4 my-3 md:justify-evenly md:flex-row md:px-6">
          {/* <div className="w-full flex flex-row basis-1/4 items-center md:justify-start px-1 py-2 my-1 bg-[#F6F6F6]">
            <div className="mx-2">
              <img
                src="/images/mobile_shop_app.svg"
                width={50}
                height={50}
                alt=""
                className="w-[48px] h-[48px]"
              />
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <div className="flex flex-col items-start">
                <div className="text-sm font-bold">THE Trialshopy APP</div>
                <Link href="#" className="text-[#949494] text-[0.9rem]">
                  Seamless on-the-go shopping
                </Link>
              </div>
              <Link href={"#"}>
                <div className="underline text-[0.9rem]">Download Now</div>
              </Link>
            </div>
          </div> */}

          {/* <div className="w-full flex flex-row basis-1/4 items-center md:justify-start px-1 py-2 my-1 bg-[#F6F6F6]">
            <div className="mx-2">
              <img
                src="/images/3people.svg"
                width={50}
                height={50}
                alt=""
                className="w-[48px] h-[48px]"
              />
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <div className="flex flex-col items-start">
                <div className="text-sm font-bold">TS REFERRAL PROGRAM</div>
                <Link href="#" className="text-[#949494] text-[0.9rem]">
                  Refer a friend: Give ₹250, get ₹250
                </Link>
              </div>
              <Link href={"#"}>
                <div className="underline text-[0.9rem]">Find out more</div>
              </Link>
            </div>
          </div> */}

          <div className="w-full flex flex-row basis-1/4 items-center md:justify-start px-1 py-2 my-1 bg-[#F6F6F6]">
            <div className="mx-2">
              <img
                src="/images/truck.svg"
                width={50}
                height={50}
                alt=""
                className="w-[48px] h-[48px]"
              />
            </div>
            <div className="flex flex-col items-start w-full gap-1">
              <div className="flex flex-col items-start">
                <div className="text-sm font-bold">
                  FAST, SAFE, CONVENIENT DELIVERY
                </div>
                <Link
                  href="/account/orders"
                  className="text-[#949494] text-[0.9rem]"
                >
                  On all orders
                </Link>
              </div>
              <Link href="/account/orders">
                <div className="underline text-[0.9rem]">Find out more</div>
              </Link>
            </div>
          </div>
        </div>

        <section className="flex-col items-center w-full lg:flex lg:flex-row sm:flex-col sm:justify-center sm:items-center lg:items-start">
          <div className="py-3 lg:px-10 sm:text-center sm:py-4 lg:py-0">
            <Link
              href="#"
              className=" w-47.5 h-5 flex justify-center items-center font-bold sm:h-6 font-fontdBold sm:font-fontBold sm:text-centertext -sm leading-6 lg:flex  text-black flex-none order-none self-stretch grow-0"
            >
              ONLINE SHOPPING
            </Link>

            <div className="flex flex-col items-center gap-1 py-2 md:items-start">
              <Link
                href="#"
                className="flex items-center self-stretch justify-center h-3 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start grow-0"
              >
                Men
              </Link>
              <Link
                href="#"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Women
              </Link>
              <Link
                href="#"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Kids
              </Link>
              <Link
                href="/category/64b9001088cb61a80b5cf501"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Electronics
              </Link>
              <Link
                href="/category/64b9004688cb61a80b5cf509"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Jewellery
              </Link>
              <Link
                href="/category/64b9003888cb61a80b5cf507"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Furnitures
              </Link>
            </div>
          </div>

          <div className="py-3 lg:px-10 sm:py-4 lg:py-0">
            <Link
              href="#"
              className="w-47.5 h-5 flex justify-center items-center font-bold sm:h-6 font-fontdBold sm:font-fontBold sm:text-centertext -sm leading-6 lg:flex  text-black flex-none order-none self-stretch grow-0"
            >
              NEAR BY SHOPS
            </Link>

            <div className="flex flex-col items-center gap-1 py-2 md:items-start">
              <Link
                href="/category/64b9002188cb61a80b5cf503"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Near By Fashion
              </Link>
              <Link
                href="/category/64b9004688cb61a80b5cf509"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Near By Jewellery
              </Link>
              <Link
                href="/category/64b9001088cb61a80b5cf501"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Near By Electronics
              </Link>
              <Link
                href="/category/64b9003888cb61a80b5cf507"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Near By Furniture
              </Link>
              <Link
                href="/nearByStore"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Near By All Shops
              </Link>
            </div>
          </div>
          <div className="py-3 lg:px-8 sm:py-4 lg:py-0">
            <Link
              href="#"
              className="w-47.5 h-3 flex justify-center items-center font-bold sm:h-6 font-fontdBold sm:font-fontBold sm:text-centertext -sm leading-6 lg:flex lg:justify-center lg:items-center lg:pr-7 text-black flex-none order-none self-stretch grow-0"
            >
              HELP & INFO
            </Link>

            <div className="flex flex-col items-center gap-1 py-2 md:items-start">
              <Link
                href="/account/orders"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Track An Order
              </Link>
              <Link
                href="#"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Contact Us
              </Link>
              <Link
                href="/products"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                FAQs
              </Link>
              <Link
                href="/account/policy"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Privacy Policy
              </Link>
              <Link
                href="/account/policy"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Cookie Policy
              </Link>
              <Link
                href="/account/policy"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Shipping Policy
              </Link>
              <Link
                href="/account/terms&conditions"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Terms & Conditions
              </Link>
            </div>
          </div>
          <div className="py-3 lg:px-10 sm:py-4 lg:py-0">
            <Link
              href="#"
              className="w-47.5 h-5 flex justify-center items-center font-bold sm:h-6 font-fontdBold sm:font-fontBold sm:text-centertext -sm leading-6 lg:flex  text-black flex-none order-none self-stretch grow-0"
            >
              Trialshopy FOR BUSINESS
            </Link>

            <div className="flex flex-col items-center gap-1 py-2 lg:items-start">
              <Link
                href="/become-seller/sellerlogin"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                How To Sell
              </Link>
              <Link
                href="/account/newsletter"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Advertise on Trialshopy
              </Link>
              <Link
                href="/account/support&help"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-start lg:py-3 grow-0"
              >
                Business Support
              </Link>
              <a
                href="https://seller.trialshopy.com"
                className="px-2 py-1 my-3 rounded-lg bg-gradient-to-b from-primary to-secondary"
              >
                Become A Seller
              </a>
            </div>
          </div>

          <section className="py-3 lg:px-10 lg:w-1/5 sm:py-4 lg:py-0">
            <div>
              <Link
                href="#"
                className="w-47.5 h-5 flex justify-center items-center font-bold sm:h-6 font-fontdBold sm:font-fontBold sm:text-centertext -sm leading-6 lg:flex  text-black flex-none order-none self-stretch grow-0"
              >
                EMAIL US
              </Link>

              <Link
                href="#"
                className="flex items-center self-stretch justify-center flex-none order-none h-4 text-xs leading-5 text-gray-800 w-34 font-fontRegular sm:flex sm:justify-center lg:justify-center grow-0"
              >
                customercare@Trialshopy.com
              </Link>
            </div>

            <div>
              <Link
                href="/account/contactus"
                className="sm:w-47.5 h-3 py-4 flex justify-center items-center font-bold sm:h-6 font-fontdBold sm:font-fontBold sm:text-centertext -sm leading-6 lg:flex  text-black flex-none order-none self-stretch grow-0"
              >
                KEEP IN TOUCH
              </Link>

              <section className="flex items-center justify-center w-full lg:flex lg:w-3/5 lg:justify-start lg:py-3 lg:ml-5 lg:px-4 sm:flex sm:justify-center sm:items-center sm:py-3">
                <Link href="https://www.instagram.com/trialshopy/">
                  <img
                    src="/images/Instagram.svg"
                    alt="myIcon"
                    width={23}
                    height={23}
                    className="mx-4"
                  />
                </Link>
                <Link href="https://www.instagram.com/trialshopy/">
                  <img
                    src="/images/Facebook.svg"
                    alt="myIcon"
                    width={23}
                    height={23}
                    className="mx-4"
                  />
                </Link>
                <Link href="https://www.instagram.com/trialshopy/">
                  <img
                    src="/images/Twitter.svg"
                    alt="myIcon"
                    width={23}
                    height={23}
                    className="mx-4"
                  />
                </Link>
                <Link href="https://youtube.com/@TrialshopyOfficial">
                  <img
                    src="/images/Youtube.svg"
                    alt="myIcon"
                    width={23}
                    height={23}
                    className="mx-4"
                  />
                </Link>
              </section>
            </div>
          </section>
        </section>

        <section className="flex flex-col items-center w-full my-3 sm:flex lg:flex-row sm:flex-col sm:justify-center sm:items-center sm:w-full">
          <section className="w-screen flex flex-col items-center m-auto lg:flex lg:items-start lg:justify-start lg:mx-7 lg:justify-self-center lg:w-2/4 lg:h-3.025 lg:mr-5 sm:mx-2 font-fontBold font-bold text-xs leading-5 sm:w-screen sm:text-center  text-gray-800  order-none self-stretch grow-0">
            <Link
              href="#"
              className="sm:flex lg:ml-16 sm:justify-center sm:items-center lg:py-2 "
            >
              TRIALSHOOPY ACCEPTS
            </Link>

            <section className="flex flex-row px-3 lg:ml-16 sm:flex sm:justify-center sm:items-center lg:justify-self-start">
              <section className="mx-2">
                <img
                  src="/images/bhim.svg"
                  alt="myIcon"
                  width={50}
                  height={50}
                />
              </section>

              <section className="mx-2">
                <img
                  src="/images/mastercard.svg"
                  alt="myIcon"
                  width={50}
                  height={50}
                />
              </section>

              <section className="mx-2">
                <img
                  src="/images/visa.svg"
                  alt="myIcon"
                  width={50}
                  height={50}
                />
              </section>

              <section className="mx-2">
                <img
                  src="/images/COD.svg"
                  alt="myIcon"
                  width={50}
                  height={50}
                />
              </section>
            </section>
          </section>

          <section className="lg:w-1/3 flex flex-row justify-center items-center px-2 sm:w-screen h-4.5 lg:relative  lg:left-10 lg:pl-5 sm:text-center sm:flex sm:justify-center sm:items-center font-fontRegular font-normal text-xs leading-4  lg:items-center text-right text-gray-800 flex-none order-none self-stretch grow-0">
            © 2024 Trialshopy Marketplace Pvt. Ltd. All rights reserved.
          </section>
        </section>
      </div>
    </>
  );
};

export default Footer;
