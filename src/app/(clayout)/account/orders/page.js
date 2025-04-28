import Orders from "@/components/account/Orders";
import SidebarLayout from "@/layouts/SidebarLayout";
import React from "react";

export default function page() {
  return (
    <>
      <SidebarLayout>
        <Orders />
      </SidebarLayout>
    </>
  );
}
