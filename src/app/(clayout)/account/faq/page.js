import FAQBody from "@/components/header/FaqBody";
import Faq from "@/components/header/FaqSidebar";
import React from "react";

export default function page() {
  return (
    <>
      <div className=" block md:flex justify-center gap-3 p-5 mt-4">
        <Faq />
        <FAQBody />
      </div>
    </>
  );
}
