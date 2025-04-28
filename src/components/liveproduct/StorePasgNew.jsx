"use client";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState, useEffect, useContext } from "react";
import Pagination from "../pagination/Pagination";
import ShopNowCard2 from "./ShopNowCard2";
import { UserContext } from "@/lib/UserContext";

function StorePasgNew({storeData}) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [storeId,setStoreId]=useState("")
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Change this value as needed
  const totalPages = Math.ceil(products.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  const searchParams = useSearchParams();
useEffect(()=>{
  setStoreId(searchParams.get("storeId"))
})

  useEffect(() => {
    const customerId =
      authenticated.user?._id || localStorage.getItem("customerId");
    const fetchProductData = async () => {
      setLoading(true);

      const storeName = storeData.storeName;
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/liveDemo/${customerId}`
        );
        
        const data = response.data;

        if (data.items) {
          const filteredProducts = storeName
            ? data.items.filter(
                (liveDemoProduct) =>
                  liveDemoProduct.storeId.storeName === storeName
              )
            : data.items;

          setProducts(filteredProducts);
        } else {
          console.warn("Invalid live demo products data format:", data);
        }
      } catch (error) {
        console.error("Error fetching live demo products:", error);
      } finally {
        setLoading(false);
      }
    };
    if (authenticated.user && authenticated.user._id) {
      fetchProductData();
    }
  }, [authenticated.user, serverURL,storeId]);

  const uniqueStoreNames = [
    ...new Set(products.map((product) => product.storeId?.storeName)),
  ];
  return (
    <>
      <div className="w-full px-7 mt-6">
        <div className="">
          <div className="font-Poppins text-xl leading-36 tracking-normal text-left ">
            <p>Selected product</p>
          </div>
          <div className="flex flex-row mb-4 -ml-2 rounded">
            <Link href="/account" className="py-3 flex flex-row">
              <img
                width={100}
                height={100}
                src={
                  authenticated && authenticated.user?.profilePic
                    ? authenticated.user?.profilePic?.url
                    : "/images/man.svg"
                }
                className="rounded-[50%] h-12 w-12 my-auto mx-2"
                alt="user"
              />
              {authenticated ? (
                <div className="flex flex-col items-start justify-center">
                  <div className="text-[16px] mr-3 flex text-gray-900 font-Poppins">
                    {authenticated.user.name}
                  </div>

                  <div className="font-semibold text-[16px] mr-3 flex text-gray-900 font-Poppins ">
                    <span className="text-gray-900 font-Poppins text-16 font-normal mt-2">
                      Product
                    </span>
                    <span className="text-[#FE7B2E] font-Poppins text-[24px] font-medium ml-1">
                      {products.length}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-start justify-center">
                  <div className="font-semibold text-[16px] mr-3 flex text-gray-900 font-Poppins">
                    Wade Warren
                  </div>
                  <div className="flex items-center">
                    <span>Product</span>
                    <span>{products.length}</span>
                  </div>
                </div>
              )}
            </Link>
            <div className="flex ml-auto items-center">
              {uniqueStoreNames.map((storeName, index) => (
                <div key={index}>
                  <button className="text-[16px] flex font-Poppins">
                    <Link
                      href={`ShopNowPage?storeId=${ storeData?._id}&storeName=${encodeURIComponent(
                        storeName
                      )}`}
                    >
                      See All
                    </Link>
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
          <ShopNowCard2 products={products} />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
}

export default StorePasgNew;
