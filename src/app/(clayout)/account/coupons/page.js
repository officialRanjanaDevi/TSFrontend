import Coupons from "@/components/account/Coupons";
import SidebarLayout from "@/layouts/SidebarLayout";
import React from "react";

export default function page() {
  return (
    <>
      <SidebarLayout>
        <Coupons />
      </SidebarLayout>
    </>
  );
}
