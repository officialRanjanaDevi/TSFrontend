import { ProductDetails } from "@/components/productDetails/ProductDetails";
import { notFound } from "next/navigation";

export default function ProductDetailPage({ searchParams }) {
  const search = searchParams.productId;
  if (!search) {
    notFound();
  }
  return (
    <>
      <ProductDetails productId={search} />
    </>
  );
}
