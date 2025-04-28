import React from "react";
import Image from "next/image";

const EmptyStoreOffers = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="h-fit my-3">
        <Image
          width={20}
          height={20}
          alt="empty_live_demo"
          loading="eager"
          unoptimized={true}
          src={"/images/cart/Empty_box.gif"}
          className="w-[70vw] md:w-[40vw] lg:w-[20vw]"
        />
        <div className="text-center">No offers available from this store!</div>
      </div>
    </div>
  );
};

export default EmptyStoreOffers;
