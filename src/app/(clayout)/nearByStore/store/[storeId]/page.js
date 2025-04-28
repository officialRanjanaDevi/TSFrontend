import StorePage from "@/components/store/Index";
// import StoreProducts from "@/components/store/StoreProducts";

export default function NearByStorePage({ searchParams }) {
  const search = searchParams.storeId;
  return (
    <div className=" h-screen">
    
      <StorePage storeId={search} />
    </div>
  );
}
