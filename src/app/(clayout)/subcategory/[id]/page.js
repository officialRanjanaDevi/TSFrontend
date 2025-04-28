import React from "react";
import { notFound } from "next/navigation";
import axios from "axios";
import FilterSub from "@/components/pages/category/FilterSub";

async function fetchBlog(id) {
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/products`,
      {
        filters: {
          categories: [id],
        },
      }
    );

    const response = res.data.data;
    return response;
  } catch (err) {
    console.error(err);
  }
}

const SingleNearByStorePage = async ({ params }) => {
  const blog = await fetchBlog(params.id);
  if (!blog) {
    notFound();
  }
  return (
    <>
      <FilterSub data={blog} CategoryProductsId={params.id}  />
    </>
  );
};
export default SingleNearByStorePage;
