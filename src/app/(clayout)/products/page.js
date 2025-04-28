import Arrivalmen from "@/components/header/arrival/ArrivalMen";
import ArrivalWomen from "@/components/header/arrival/ArrivalWomen";

export default function products() {
  return (
    <>
      <div className="px-4 md:px-12 lg:px-[120px]  w-full my-5">
        <Arrivalmen />
        <ArrivalWomen />
        {/* <ProductReviews /> */}
      </div>
    </>
  );
}
