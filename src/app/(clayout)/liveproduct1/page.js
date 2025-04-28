import Liveproduct1 from "@/components/liveproduct/Liveproduct1";
import axios from "axios";
import { notFound } from "next/navigation";
import { Suspense } from "react";

const URL = process.env.NEXT_PUBLIC_BASE_API_URL;

const fetchResume = async (storeId) => {
  const res = await fetch(`${URL}/api/v1/store/${storeId}`, {
    method: "GET",
    cache: "no-store",
  });
  if (!res.ok) {
    notFound();
  }
  const rr = res.json();

  return rr;
};

export default async function liveproduct({ searchParams }) {
  if (!searchParams.storeId) {
    notFound();
  }
  const data = await fetchResume(searchParams?.storeId);
  // console.log("yy", data);
  if (!data) {
    notFound();
  }

  return (
    <>
      <Suspense>
        <Liveproduct1 data={data} />
      </Suspense>
    </>
  );
}
