import TermsConditions from "@/components/account/Terms&Conditions";
import SidebarLayout from "@/layouts/SidebarLayout";
import React from "react";

export default function page() {
  return (
    <>
      <SidebarLayout>
        <TermsConditions />
      </SidebarLayout>
    </>
  );
}
