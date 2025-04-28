import AddressComponent from "@/components/account/address/AddressComponent";
import SidebarLayout from "@/layouts/SidebarLayout";
import React from "react";

export default function page() {
  return (
    <>
      <SidebarLayout>
        <AddressComponent />
      </SidebarLayout>
    </>
  );
}
