import ShopNowPage from "@/components/liveproduct/ShopNowPage";
import React, { Suspense } from "react";

export default function page() {
  return (
    <div>
      <Suspense>
        <ShopNowPage />
      </Suspense>
    </div>
  );
}
