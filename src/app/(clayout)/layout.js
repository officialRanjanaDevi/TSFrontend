import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import React from "react";

export default function layout({ children }) {
  return (
    <>
      <div className="h-screen flex flex-col">
        <Header />
        <div className="flex flex-row flex-1">
          <main className="w-full">{children}</main>
        </div>
        <Footer />
      </div>
    </>
  );
}
