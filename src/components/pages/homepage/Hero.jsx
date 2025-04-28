"use client";
import React, { useState, useEffect } from "react";
import { Carousel } from "antd";
import Link from "next/link";
import Image from "next/image";
import toast from "react-hot-toast";
import axios from "axios";
function useWindowWidth() {
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    setWindowWidth(window.innerWidth);

    function handleResize() {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return windowWidth;
}

const Hero = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [showCarousel, setShowCarousel] = useState(false);
  const screenWidth = useWindowWidth();

  const smallImageURL1 = "/images/hero_background.jpg";
  const largeImageURL1 = "/images/hero_background.jpg";
  const imageUrl1 = screenWidth > 600 ? largeImageURL1 : smallImageURL1;
  const [data,setData]=useState([]);
  const fetchBanner=async()=>{
    try{
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/banner/getBanners`,
      );
      
        
      setData(response.data.data)
     console.log(response.data.data,"aagaa")
    }catch(err){
      toast.error(err?.response?.data?.message);
      console.error(err);
    }
  }
  useEffect(()=>{
    fetchBanner()

  },[])

  useEffect(() => {
    if (data.length === 0) return;
    console.log(data)
    const images = [
      {
        small:data.find(item => item.category === "carousalBanner1")?.url ||  "/images/hero_background.jpg",  
        large:data.find(item => item.category === "carousalBanner1")?.url ||  "/images/hero_background.jpg",
        alt: "Your own trial room",
        title: "YOUR OWN TRIAL ROOM",
        subtitle: "ANYWHERE ANYTIME",
        description:
          "Enhancing the online shopping experience to mirror the reality of physical retail",
        buttonText: "Explore Now",
        buttonLink: "/products",
      },
      {
        small:data.find(item => item.category === "carousalBanner2")?.url || "/images/Banner7.svg",  
        large:data.find(item => item.category === "carousalBanner2")?.url || "/images/Banner7.svg", 
        alt: "Shop Now",
        buttonText: "Shop Now",
        buttonLink: "/products",
      },
      {
        small:data.find(item => item.category === "carousalBanner3")?.url || "/images/Banner5.svg",  
        large:data.find(item => item.category === "carousalBanner3")?.url || "/images/Banner5.svg",  
        alt: "Shop Now",
        buttonText: "Shop Now",
        buttonLink: "/products",
      },
      {
        small:data.find(item => item.category === "carousalBanner4")?.url || "/images/Banner6.svg",  
        large: data.find(item => item.category === "carousalBanner4")?.url || "/images/Banner6.svg", 
        alt: "Shop Now",
        buttonText: "Shop Now",
        buttonLink: "/products",
      },
      {
        small:data.find(item => item.category === "carousalBanner5")?.url || "/images/Banner7.svg",  
        large:data.find(item => item.category === "carousalBanner5")?.url || "/images/Banner7.svg",  
        alt: "Shop Now",
        buttonText: "Shop Now",
        buttonLink: "/products",
      },
    ];

    const updatedImages = images.map((image) => ({
      ...image,
      url: screenWidth > 600 ? image.large : image.small,
    }));

    setImageUrls(updatedImages);
  }, [data,screenWidth]);

  useEffect(() => {
    // Show carousel after 1 seconds
    const timer = setTimeout(() => setShowCarousel(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {showCarousel ? (
        <Carousel autoplay>
          {imageUrls.map((image, index) => (
            <div key={index} className="relative w-full h-full">
              <Image
                src={image.url}
                alt={image.alt}
                className="object-cover w-full lg:h-[60vh] h-[180px]"
                width={1000}
                height={1000}
              />
              <div className="absolute inset-0 flex flex-col justify-between w-full h-full px-5 lg:px-[120px] py-6 lg:py-[90px] bg-gradient-to-b from-transparent to-black/25">
                <div>
                  {image.title && (
                    <h2 className="hero-text text-white text-[20px] lg:text-[32px] font-semibold">
                      {image.title}
                    </h2>
                  )}
                  {image.subtitle && (
                    <h2 className="text-white text-[18px] lg:text-[22px] font-medium">
                      {image.subtitle}
                    </h2>
                  )}
                  {image.description && (
                    <p className="hidden lg:block text-white text-[18px]">
                      {image.description}
                    </p>
                  )}
                </div>
                {image.buttonLink && image.buttonText && (
                  <div className="mb-0 lg:-mb-10">
                    <Link href={image.buttonLink}>
                      <button className="flex max-sm:text-xs flex-row items-center justify-center rounded-md sm:px-4 sm:py-2 py-1 px-2 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] text-black">
                        <p className="flex gap-1 font-medium capitalize lg:uppercase">
                          {image.buttonText}
                        </p>
                        <div className="flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                          >
                            <g clipPath="url(#clip0_4893_5386)">
                              <path
                                d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
                                fill="black"
                              />
                            </g>
                            <defs>
                              <clipPath id="clip0_4893_5386">
                                <rect width="24" height="24" fill="white" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          ))}
        </Carousel>
      ) : (
        <div className="relative w-full h-full">
          <Image
            src={imageUrl1}
            alt="image 1"
            className="object-cover w-full lg:h-[60vh] h-[180px]"
            width={1000}
            height={1000}
          />
          <div className="absolute inset-0 grid w-full h-full ">
            <div className="flex flex-col items-start justify-between px-5 lg:px-[120px] py-6 lg:py-[90px]  w-full h-full">
              <h2 className="hero-text text-white text-[20px] lg:text-[32px] font-semibold">
                YOUR OWN TRIAL ROOM
              </h2>
              <h2 className="text-white text-[18px] lg:text-[22px] font-medium">
                ANYWHERE ANYTIME
              </h2>
              <p className="hidden lg:block text-white text-[18px]">
                Enhancing the online shopping experience to mirror the reality
                <br />
                of physical retail
              </p>
              <Link
                href="/products"
                className="text-base font-normal text-black py-auto font-poppins"
              >
                <button className="flex flex-row items-center justify-center rounded-md py-2 px-4 bg-gradient-to-t from-[#FAAC06]  to-[#EB8105]">
                  <p className="flex gap-1 font-medium captilize lg:uppercase">
                    Explore <span className="hidden lg:flex">Now</span>
                  </p>
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <g clipPath="url(#clip0_4893_5386)">
                        <path
                          d="M10 6L8.59 7.41L13.17 12L8.59 16.59L10 18L16 12L10 6Z"
                          fill="black"
                        />
                      </g>
                      <defs>
                        <clipPath id="clip0_4893_5386">
                          <rect width="24" height="24" fill="white" />
                        </clipPath>
                      </defs>
                    </svg>
                  </div>
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Hero;
