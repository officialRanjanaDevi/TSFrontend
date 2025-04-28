"use client";
import React, { useState, useEffect } from "react";
import NearBy, { SampleNextArrow, SamplePrevArrow } from "./NearBy";
import Link from "next/link";
import NewArrival from "./NewArrival";
import BrandNewDeals from "./BrandNewDeals";
import Image from "next/image";
import GirlsCollection from "./GirlsCollection";
import toast from "react-hot-toast";
import axios from "axios";
import BoysCollection from "./BoysCollection";
import PopularMerchant from "./popularMerchantsNearYou";
import { Carousel } from "antd";
import newBanner from "./images/assets"
const HomePage = () => {
  const [data,setData]=useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    if (sessionStorage.getItem("homeCategories")) {
      setCategoriesData(JSON.parse(sessionStorage.getItem("homeCategories")));
    } else {
      const api = `${serverURL}/api/v1/homeCategories`;
      const fetchData = async () => {
        axios
          .get(api)
          .then((response) => {
            setCategoriesData(response.data);
            
            sessionStorage.setItem(
              "homeCategories",
              JSON.stringify(response.data)
            );
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      };
      fetchData();
    }
  }, [serverURL]);

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    draggable: true,
    // autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
        },
        breakpoint: 400,
        settings: {
          slidesToShow: 3,
        },
      },
    ],
  };

  const fetchBanner=async()=>{
    try{
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/banner/getBanners`,
      );
      
        
      setData(response.data.data)
   
    }catch(err){
      toast.error(err?.response?.data?.message);
      console.error(err);
    }
  }
  useEffect(()=>{
    fetchBanner()
  },[])
  return (
    <>
    
      <div className="flex flex-col items-start gap-2 py-4 lg:gap-8 lg:py-12 ">
        <div className="px-4 md:px-12 lg:px-[120px] w-full">
          <div className="text-xl font-bold text-left ">
            <h2 className="inline-block mb-5 border-b-2 border-red-700 ">
              Nearby Products
            </h2>
          </div>
          <NearBy />
        </div>

        {categoriesData &&
          categoriesData?.length > 0 &&
          categoriesData
            .filter((category) => category && category.name)
            .map((category, index) => (
              <div
                key={category._id}
                className="px-4 md:px-12 lg:px-[120px] w-full"
              >
                <div>
                  <Link href={`/nearByStores/${category._id}`} className="">
                    <div className="text-xl font-bold text-left">
                      <h2 className="inline-block mb-5 border-b-2 border-red-700 ">
                        {category.name}
                      </h2>
                    </div>
                  </Link>
                  {category.children?.length > 0 && (
                    <Carousel
                      {...settings}
                      className="flex flex-row items-center justify-between gap-4 lg:gap-6 w-full grid-container"
                    >
                      {category.children.map((card, index) => (
                        <Link
                          key={index}
                          href={`/subcategory/${card._id}`}
                          className=""
                        >
                          <div className=" flex flex-col items-center gap-3 shrink-0 hover:font-semibold">
                            <div className="w-28 sm:w-32 md:w-48 lg:w-[220px] h-32 md:h-48 lg:h-[220px] overflow-auto hover:shadow-lg rounded-[6px] border-[1px] p-2 border-[#EEEEEE]">
                              <img
                                width={300}
                                height={300}
                                src={card?.image.url}
                                alt={card.name}
                                className="w-full h-full "
                              />
                            </div>

                            <div className="w-24 sm:w-32 pl-1 sm:pl-2 flex justify-start flex-col md:w-48 lg:w-[220px]">
                              <p className="w-24 sm:w-full  h-30 truncate font-poppins text-[10px] sm:text-sm lg:text-base leading-[150%] font-[600]">
                                {card.name}
                              </p>
                              <p className="w-24 sm:w-full h-30 font-poppins text-[10px] sm:text-sm lg:text-base leading-[150%] text-[#888888]">
                               upto {card.discount}% OFF
                              </p>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </Carousel>
                  )}
                </div>
              </div>
            ))}
        <div className="px-4 md:px-12 lg:px-[120px] w-full">
          <img
            width={1000}
            height={100}
            src={data.find(item => item.category === "ads")?.url || ""}  
           
            alt={newBanner}
            className="w-full m-auto rounded "
          />
        </div>
        <div className="px-4 md:px-12 lg:px-[118px] w-full">
          <Link href={"/category/64cf8488a192afa1c02320f5"} className="">
            <div className="text-xl font-bold text-left">
              <h2 className="inline-block mt-2 mb-1 border-b-2 border-red-700 ">
                NEW ARRIVALS
              </h2>
            </div>
          </Link>
          <NewArrival />
        </div>
        <div className="px-4 md:px-12 lg:px-[120px] w-full">
          <BrandNewDeals />
        </div>
        <div className="px-4 md:px-12 lg:px-[120px] w-full">
          <img
            width={1000}
            height={100}
            src={data.find(item => item.category === "bottomBanner1")?.url || "/images/ads2.png"}  
        
            alt="ads"
            className="w-full m-auto"
          />
        </div>
        <div className="px-4 md:px-12 lg:px-[120px] w-full">
          <PopularMerchant />
        </div>

        <div className="w-full bg-gradient-to-b from-transparent h-full to-[#DCDFFA]">
          <BoysCollection />
        </div>

        <div className="bg-gradient-to-b from-transparent to-[#FBD0F1] h-full w-full">
          <GirlsCollection />
        </div>
        <div className="px-4 md:px-12 lg:px-[120px] w-full">
          <Image
            width={1000}
            height={100}
             src={data.find(item => item.category === "bottomBanner2")?.url || "/images/ads4.png"}  
            alt="ads"
            className="w-full m-auto"
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;
