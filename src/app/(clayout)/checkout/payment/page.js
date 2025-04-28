import Paymentpage from "@/components/payments/paymentpage";
import { Suspense } from "react";

function payment() {
  return (
    <>
      <Suspense>
        <Paymentpage />
      </Suspense>
    </>
  );
}

export default payment;
