import Account from "@/components/account/Account";
import SidebarLayout from "@/layouts/SidebarLayout";
import React from "react";

export default function page() {
  return (
    <>
      <SidebarLayout>
        <Account />
      </SidebarLayout>
    </>
  );
}
