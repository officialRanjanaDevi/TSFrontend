import StorePage from "@/components/store/Index";

export default function NearByStorePage({ searchParams }) {
  const search = searchParams.storeId;

  return (
    <>
      <StorePage storeId={search} />
    </>
  );
}
