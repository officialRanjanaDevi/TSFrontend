import ShowLiveStream from "@/components/liveproduct/ShowLiveStream";
import { notFound } from "next/navigation";
import React from "react";

export default function page({ searchParams }) {
  // console.log("searchParams", searchParams);
  if (!searchParams.roomID) {
    notFound();
  }
  return (
    <>
      <ShowLiveStream />
    </>
  );
}
