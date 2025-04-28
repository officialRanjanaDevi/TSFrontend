import React from "react";
import Image from "next/image";
import { AiOutlineRight } from "react-icons/ai";
import { MdOutlineCall } from "react-icons/md";
import { BsWhatsapp, BsCameraVideo } from "react-icons/bs";
import Link from "next/link";

export default function VisitStoreCard({ storeId }) {
  return (
    <>
      <section className="flex flex-col mt-4 w-full">
        <section className="flex flex-col items-center p-2 py-5 m-1 border sm:w-full border-slate-300 ">
          <section className="flex py-2">
            <Image
              src="/icons/StoreReiviewCardAero.png"
              alt="aero"
              width={20}
              height={20}
              className="mx-1 sm:w-4 sm:h-4"
            />
            <p className="text-[#5B5B5B] font-fontBold sm:p-1 text-xs">
              Order Online or Schedule a Pickup
            </p>
          </section>
          <section className="bg-gradient-to-b from-[#FAAC06] to-[#EB8105] w-4/5 h-8 py-1 text-center text-black font-semibold">
            <Link href="/account/contactus">Contact Us</Link>
          </section>
        </section>

        <section className="flex flex-col gap-4 p-3 m-1 border sm:w-full border-slate-300">
          <p className="text-xs text-black font-fontBold sm:p-1">
            How we can help you today?
          </p>
          <p className="text-xs font-fontRegular text-[#5B5B5B] sm:p-1 mb-2 ">
            Select the option below so that we can serve you better.
          </p>

          <section className="flex flex-row w-full p-3 py-4 border border-slate-300">
            <section className="flex items-center justify-center w-12 ">
              <BsCameraVideo className=" text-[#5B5B5B]" />
            </section>
            <section className="w-3/4 text-xs">
              <p className="text-xs text-[##5B5B5B] font-fontBold sm:py-1">
                Video shopping
              </p>

              <p className="text-xs font-fontRegular text-[#7C7C7C]">
                Have a one on one 60 min live virtual shopping experience with
                our team via Video Call to see your favorite product live!
              </p>
            </section>
            <section className="flex items-center w-9 sm:px-2 ">
              <AiOutlineRight />
            </section>
          </section>

          <section className="flex flex-row w-full p-3 border border-slate-300">
            <section className="flex items-center justify-center w-12 ">
              <MdOutlineCall className=" text-[#5B5B5B]" />
            </section>
            <section className="w-3/4 text-xs">
              <p className="text-xs text-[##5B5B5B] font-fontBold sm:py-1">
                Talk to us
              </p>

              <p className="text-xs font-fontRegular text-[#7C7C7C]">
                Give us a quick ring via Phone Call to have all your queries
                answered by our customer support team!
              </p>
            </section>
            <section className="flex items-center w-9 sm:px-2 ">
              <AiOutlineRight />
            </section>
          </section>

          <section className="flex flex-row w-full p-3 border border-slate-300">
            <section className="flex items-center justify-center w-12 ">
              <BsWhatsapp className=" text-[#5B5B5B]" />
            </section>
            <Link
              href={`/liveproduct1?storeId=${storeId}`}
              className="w-3/4 text-xs"
            >
              <p className="text-xs text-[##5B5B5B] font-fontBold sm:py-1">
                Chat with us
              </p>

              <p className="text-xs font-fontRegular text-[#7C7C7C]">
                Have all your queries conveniently answered by our customer
                support executives via Whatsapp Chat!
              </p>
            </Link>
            <section className="flex items-center w-9 sm:px-2 ">
              <AiOutlineRight />
            </section>
          </section>
        </section>
      </section>
    </>
  );
}
