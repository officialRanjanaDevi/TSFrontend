import React from "react";
import BrandCard1 from "./BrandCard1";

const BrandGrid1 = ({ products }) => {
  return (
    <div className="flex flex-row justify-start items-start gap-4 lg:gap-14 w-full py-1 pt-0">
      {products?.map((product, key) => (
        <BrandCard1 key={key} productDetails={product} />
      ))}
    </div>
  );
};

export default BrandGrid1;
