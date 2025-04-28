"use client";
import axios from "axios";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback, useContext } from "react";
import Image from "next/image";
import { UserContext } from "@/lib/UserContext";

function ShopNowCard() {
  const [loading, setLoading] = useState(true);
  const [liveDemoProducts, setLiveDemoProducts] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState({});
  const router = useRouter();
  const search = useSearchParams();
  const storeId=search.get("storeId");
  const storeName = search.get("storeName");
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [products,setProducts]=useState([])

  useEffect(() => {
    const customerId =
      authenticated.user?._id || localStorage.getItem("customerId");
    const fetchProductData = async () => {
      setLoading(true);

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
  }, [authenticated.user, serverURL]);

  
  useEffect(() => {
    setFavourites(authenticated.user.wishList || []);
  }, [authenticated.user.wishList]);

  const isFavourite = (productId) => {
    return favourites.includes(productId);
  };

  const handleFavouriteClick = (productId) => {
    const favourite = isFavourite(productId);
    const customerId =
      authenticated.user?._id || localStorage.getItem("customerId");

    let api = "";

    if (!favourite) {
      api = `${serverURL}/api/v1/addWishList/${customerId}/${productId}`;
      axios
        .post(api)
        .then((res) => {
          setAuthenticated({ user: res.data });
        })
        .catch((err) => console.error(err));
    } else {
      api = `${serverURL}/api/v1/deleteWishList/${customerId}/${productId}`;
      axios
        .delete(api)
        .then((res) => {
          setAuthenticated({ user: res.data });
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <>
      <div className="w-full my-6">
        <div className="w-full h-full overflow-auto">
          {(products&&products.length>0) ? (
        
            <div className="w-full">
              <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 md:grid-col-4">
                {products.map((liveDemoProduct, index) => {
                  const selectedSize = selectedSizes[liveDemoProduct._id];
                  const sizePrice =
                    liveDemoProduct?.Size[selectedSize]?.trialshopyPrice ||
                    liveDemoProduct?.Size['M']?.trialshopyPrice ||
                    liveDemoProduct?.Size['FreeSize']?.trialshopyPrice ||
                    "N/A";
                    const MRP=   liveDemoProduct?.Size[selectedSize]?.MRP ||
                    liveDemoProduct?.Size['M']?.MRP ||
                    liveDemoProduct?.Size['FreeSize']?.MRP ||
                    "N/A";
                  const discountedPrice =
                    sizePrice - (sizePrice * liveDemoProduct.discount) / 100;
                  const discount = Math.round(
                    ((discountedPrice -MRP) /MRP) *100
                  );
            
                  return (
                    <div key={index} className="relative w-full h-auto">
                      <div className="relative block w-full overflow-hidden">
                        <Link
                          href={`/products/details?productId=${liveDemoProduct._id}`}
                        >
                          <img
                            width={500}
                            height={500}
                            src={liveDemoProduct?.productImage}
                            alt={liveDemoProduct?.productName}
                            className="block min-w-[80px] w-full h-[120px] xl:h-[256px] lg:h-[200px] md:h-[20vh]"
                          />
                        </Link>

                        <div className="absolute flex items-center text-black py-0.5 lg:py-1 px-1 lg:px-2 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
                          <h2 className="flex flex-row items-center gap-1 mr-1 text-xs font-semibold">
                            {liveDemoProduct.storeId.rating?.rating}
                          </h2>
                          <div className="">
                            <Image
                              alt="heart"
                              width={20}
                              height={20}
                              className="w-2 h-2 lg:w-4 lg:h-4"
                              src={"/images/Vector2.svg"}
                            />
                          </div>
                          {/* <div className="pl-1 border-l border-gray-400 text-[12px]">
                            {liveDemoProduct.rating?.count}
                          </div> */}
                        </div>
                        <div className="absolute text-black right-2 lg:right-7 top-2 lg:top-3">
                          <h2 className="">
                            <button>
                              <Image
                                width={25}
                                height={25}
                                alt="ecommerce"
                                className="w-5 h-5 cursor-pointer lg:h-6 lg:w-6"
                                src={
                                  isFavourite(liveDemoProduct._id)
                                    ? "/images/heart.svg"
                                    : "/images/Vector3.svg"
                                }
                                onClick={() =>
                                  handleFavouriteClick(liveDemoProduct._id)
                                }
                              />
                            </button>
                          </h2>
                        </div>
                      </div>
                      <div className="flex flex-col w-full gap-2 mt-2 item-center">
                        <p className="text-[#18181B] font-poppins text-sm lg:text-[20px] leading-[20px] font-semibold">
                          {liveDemoProduct.productName}
                        </p>

                        <p className="text-[#7C7C7C] inline-block w-full whitespace-nowrap text-xs lg:text-sm overflow-hidden text-ellipsis">
                          {liveDemoProduct.shortDescription}
                        </p>

                        <div className="font-poppins text-[7px] leading-11 text-left">
                          <div className="flex justify-between text-[#7C7C7C]">
                            <div className="flex gap-2 border-2 border-neutral-300 bg-neutral-100 p-1 rounded">
                            <div className="text-black font-normal text-xs lg:text-sm leading-9.66">
                              ₹{sizePrice}
                            </div>
                            <div className="text-red-400 line-through ml-1 font-normal text-xs lg:text-sm leading-9.66">
                              ₹{MRP}
                            </div></div>
                            <div className="ml-1 text-green-600 font-semibold text-xs lg:text-sm leading-9.66">
                              ({discount}% off)
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ):   ( <p>Loading...</p>
        ) }
        </div>
      </div>
    </>
  );
}

export default ShopNowCard;
