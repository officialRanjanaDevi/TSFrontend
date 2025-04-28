import React from "react";
import StoreProductCard from "./StoreProductCard";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";

// import NewArrival from '../homepage/arrival/NewArrival';
import NewArrival1 from "./NewArrival1";
// import ProductGrid from '../ProductCards/ProductGrid';

function ProductComp({ category }) {
  const [products, setProducts] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  // useEffect(() => {
  // 	const api = `${serverURL}/api/v1/products`;
  // 	axios
  // 		.post(api, { filters: { categories: [category._id] } })
  // 		.then((response) => {
  // 			setProducts(response.data);
  // 		})
  // 		.catch((err) => console.error(err));
  // }, [category, serverURL]);

  return (
    <div className="flex flex-col gap-2 my-3">
      {products.length > 0 && (
        <div className="text-xl font-semibold lg:block">{category.name}</div>
      )}
      <div className="flex flex-row items-center w-full gap-8 overflow-x-auto">
        {products?.length > 0
          ? products?.map((item, index) => (
            <StoreProductCard key={index} product={item} />
          ))
          : null}
      </div>
    </div>
  );
}

function CircularCard({ card }) {
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  return (
    <>
      <div className="flex flex-col items-center hover:font-semibold">
        <div className="transition-all ease-in-out duration-300 w-[72px] md:w-24 lg:w-36 h-[72px] md:h-24 lg:h-36 rounded-full overflow-hidden hover:shadow-lg p-2">
          <img
            width={100}
            height={100}
            src={card?.image?.url ? `${card?.image?.url}` : "/images/img-2.jpg"}
            alt={card.name}
            className="object-cover w-full h-full rounded-full"
          />
        </div>

        <div className="w-full mt-2">
          <Link href={`/subcategory/${card._id}`}>
            <p className="w-full h-30 font-poppins text-center text-xs lg:text-base leading-[150%]">
              {card.name}
            </p>
          </Link>
        </div>
      </div>
    </>
  );
}

const CircularCardGrid = ({storeId }) => {
  const [categoriesData, setCategoriesData] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;


  // Fetch categories
  // useEffect(() => {
  //   axios
  //     .post(`${serverURL}/api/v1/categories`, { filters: { parent: category._id } })
  //     .then((res) => {
  //       setCategoriesData(res.data.categories);
      
  //     })
  //     .catch((err) => console.error(err));
  // }, [category, serverURL]);

  // Fetch all categries whose products are uploaded by seller 
  useEffect(() => {
    axios
      .post(`${serverURL}/api/v1/getStoreProduct/${storeId}`)
      .then((res) => {
          setCategoriesData(res.data.uniqueCategories)

      })
      .catch((err) => console.error(err));
  }, [storeId, serverURL]);


  return (
    <div className="flex flex-col mb-5">
      {/* Category Title */}
      <div className="text-2xl px-2 font-semibold lg:block">Categories</div>

      {/* Categories Section */}
      {categoriesData && categoriesData.length > 0 && (
        <div className="flex mt-3 flex-row overflow-hidden items-start  w-full gap-2 overflow-auto lg:gap-4 grid-container">
          {categoriesData.map((cat, index) => (
            <Link key={cat._id} href={`/nearByStore/store/${storeId}/${cat._id}`}>
              <div className="flex gap-4">
                <CircularCard card={cat} />
              </div>
            </Link>
          ))}

        </div>
      )}

    </div>
  );
};

function StoreOverview1({ storeData }) {
  const categories = storeData.categories;
  const storeId = storeData._id;
  const [currentPosition, setCurrentPosition] = useState(0);
  const [products, setProducts] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
 
  useEffect(() => {
    const api = `${serverURL}/api/v1/products`;
    const filters = { storeId: storeId };

    axios
      .post(api, { filters: filters })
      .then((response) => {
        setProducts(response.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [storeId, serverURL]);

  const handleNextClick = () => {
    setCurrentPosition((prevPosition) => (prevPosition + 1) % products.length);
  };

  const handlePrevClick = () => {
    setCurrentPosition(
      (prevPosition) => (prevPosition - 1 + products.length) % products.length
    );
  };
  return (
    <div className="flex flex-col items-start w-full gap-4 lg:gap-8">
      <div className="relative flex flex-col items-start w-full gap-4">
        {products.length > 0 ? (
          <>
            <h2 className="text-xl font-semibold">New Arrivals</h2>
            <div
              className="bg-white bg-opacity-80 absolute -left-2 top-[50%] z-10 py-2 px-1 cursor-pointer"
              onClick={handlePrevClick}
            >
              <Image
                src="/images/store/arrow_left.svg"
                width={19}
                height={19}
                alt="arrow_left"
              />
            </div>
            <div className="flex flex-row items-center  w-full gap-4 overflow-x-scroll h-fit p-2 grid-container">
              {products.map((product,index)=>(
                   <Link
                   key={index}
                   href={`/products/details?productId=${product._id}`}
                 >
                   <div>
                     <StoreProductCard product={product} />
                   </div>
                 </Link>
             ))}
           
            </div>
            <div
              className="bg-white bg-opacity-80 absolute -right-2 top-[50%] z-10 py-2 px-1 cursor-pointer"
              onClick={handleNextClick}
            >
              <Image
                src="/images/store/arrow_right.svg"
                width={20}
                height={20}
                alt="arrow_right"
              />
            </div>
          </>
        ) : null}
      </div>

      <div className="w-full">
    
            <CircularCardGrid storeId={storeId} />
       
      </div>
    </div>
  );
}

export default StoreOverview1;
