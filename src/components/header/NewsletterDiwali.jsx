"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import BRANDCARD from "./NewsletterBrandcard";
import Newslettercard from "./NewsletterCard";
import toast from "react-hot-toast";
import axios from "axios";
import Link from 'next/link';

const NewsletterDiwali = () => {
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const [data, setData] = useState([]);
  const [popularStores, setPopularStores] = useState([]);
  const [categoriesData, setCategoriesData] = useState([]);
  const [categories, setCategories] = useState([])

  const fetchBanner = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/banner/getBanners`,
      );


      setData(response.data.data)

    } catch (err) {
      toast.error(err?.response?.data?.message);
      console.error(err);
    }
  }
  useEffect(() => {
    fetchBanner()
  }, [])
  const fetchData = async () => {
    try {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/getAllMerchantPopular`
      );

      setPopularStores(response.data);

    } catch (error) {
      console.error("Error fetching popular stores:", error);
    }
  };
  useEffect(() => {
    if (sessionStorage.getItem("homeCategories")) {
      setCategoriesData(JSON.parse(sessionStorage.getItem("homeCategories")));
    } else {
      const api = `${serverURL}/api/v1/homeCategories`;
      const fetchData = async () => {
        axios
          .get(api)
          .then((response) => {
            setCategoriesData(response.data[0]);
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
  useEffect(() => {
    fetchData();
  }, [serverURL]);

  useEffect(() => {
    setCategories(categoriesData[0]?.children)
  }, [categoriesData])
  return (
    <>
      <div className="my-2">
        <div className="w-full relative mb-5 ">
          <Image
            width={500}
            height={500}
            src={data.find(item => item.category === "NewsLetterTopBanner1")?.url || "/images/offerbg.jpeg"}

            alt=".."
            className="w-full"
          />

          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-xl text-white font-bold px-4 py-2 shadow-lg">
            GET 25% Off
          </p>
        </div>

        <div className="bg-gradient-to-r from-[#FF9000] via-[#FFA51D] to-[#FF9000] mt-7 flex  justify-center items-center  text-white w-full h-[280px]">
          <div className="text-center ">
            <h1 className="py-4 text-3xl font-bold">Free Shipping</h1>
            <p className="text-xl">
              Enhancing the online shopping experience to mirror physical retail

            </p>
          </div>
        </div>

        <div className=" flex justify-center items-center text-[#E88D0B] text-xl mt-4">
          On Sale
        </div>

        <div className="grid gap-6 sm:grid-cols-2  lg:grid-cols-4 justify-evenly mt-4 mx-4 ">
          {popularStores &&
            popularStores.slice(0, 4).map((store, index) => (
              <BRANDCARD store={store} key={index} />
            ))
          }




        </div>

        <div className="w-full px-4  lg:px-0 mt-7 mb-7">
          <Image
            width={1200}
            height={1000}
            src={data.find(item => item.category === "NewsLetterMiddleBanner2")?.url || "/images/diwali2.svg"}

            alt="ads"
            className="w-full"
          />
        </div>
        <div>



          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-4">

            {(categories && categories.length > 0) && (

              categories.slice(0, 8).map((card, index) => (
                <Link
                  key={index}
                  href={`/subcategory/${card._id}`}
                  className=""
                >
                  <div className=" flex flex-col items-center gap-3 shrink-0 hover:font-semibold">
                    <div className="overflow-auto hover:shadow-lg border-[1px]  border-[#EEEEEE]">
                      <img
                        width={300}
                        height={300}
                        src={card?.image.url}
                        alt={card.name}
                        className="w-48 h-48 "
                      />
                    </div>

                    <div className="flex flex-col justify-start w-36 sm:w-48">
                      <p className="w-full h-30 font-poppins text-sm lg:text-base  font-[600]">
                        {card.name}
                      </p>
                      <p className="w-full h-30 font-poppins text-sm lg:text-base  text-[#888888]">
                        upto {card.discount}% OFF
                      </p>
                    <div className="bg-amber-500 px-4 w-fit py-1 mt-2">SHOP NOW  </div>

                    </div>
                  </div>
                </Link>
              ))

            )}</div>

        </div>
      </div>
    </>
  );
}

export default NewsletterDiwali;
