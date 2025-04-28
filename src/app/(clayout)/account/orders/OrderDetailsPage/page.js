import OrderDetails from "@/components/account/OrderDetails";
import SidebarLayout from "@/layouts/SidebarLayout";
import { notFound } from "next/navigation";
import React from "react";

const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

async function fetchOrder(id) {
  const res = await fetch(`${serverURL}/api/v1/order/${id}`, {
    cache: "no-store",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    notFound();
  }
  return res.json();
}

export default async function page({ searchParams }) {
  // console.log(searchParams);
  if (!searchParams.orderId) {
    notFound();
  }
  const data = await fetchOrder(searchParams.orderId);
  // console.log("vhg", data);
  return (
    <SidebarLayout>
      <OrderDetails data={data} />
    </SidebarLayout>
  );
}
