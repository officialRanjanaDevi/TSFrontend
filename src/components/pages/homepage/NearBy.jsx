"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { Carousel } from "antd";

export const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} md:!flex py-2 px-1 rounded-tl after:ml-1 rounded-bl my-auto after:!top-[initial]`}
      style={{
        ...style,
        display: "none",
        alignItems: "center",
        background: "white",
        minHeight: "20px",
        minWidth: "20px",
        margin: "auto 0",
        opacity: 0.8,
        right: "0",
        color: "black",
        top: "15%",
        bottom: 0,
      }}
      onClick={onClick}
    />
  );
};

export const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={`${className} md:!flex py-2 px-1 rounded-tr rounded-br my-auto after:ml-2 after:!top-[initial]`}
      style={{
        ...style,
        display: "none",
        alignItems: "center",
        background: "white",
        minHeight: "20px",
        minWidth: "20px",
        margin: "auto 0",
        opacity: 0.8,
        left: "0",
        color: "black",
        top: "15%",
        bottom: 0,
      }}
      onClick={onClick}
    />
  );
};

const NearBy = () => {
  const [userLocation, setUserLocation] = useState(null);
  const router = useRouter();
  const [categories, setCategories] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    const fetchData = async () => {
      if (sessionStorage.getItem("homeCategories")) {
        setCategories(JSON.parse(sessionStorage.getItem("homeCategories")));
      } else {
        const api = `${serverURL}/api/v1/homeCategories`;
        axios
          .get(api)
          .then((response) => {
            setCategories(response.data);
            sessionStorage.setItem(
              "homeCategories",
              JSON.stringify(response.data)
            );
          })
          .catch((error) => {
            console.error("Error fetching categories:", error);
          });
      }
    };
    fetchData();
  }, []);

  const Column = ({ imageName, text, route }) => (
    <>
      <Link
        href={route}
        className="flex flex-col items-center rounded cursor-pointer hover:shadow-lg hover:font-semibold hover:scale-105"
      >
        <div className="w-16 h-16 overflow-hidden rounded-full shrink-0 md:w-24 lg:w-48 md:h-24 lg:h-44 lg:rounded-sm">
          <img
            className="object-cover w-full h-full"
            src={imageName}
            width={400}
            height={400}
            alt={text}
          />
        </div>
        <div className="w-20 p-2 md:w-24 lg:w-48 ">
          <p className="inline-block w-full overflow-hidden text-[10px] font-medium uppercase sm:text-sm text-center lg:text-base whitespace-nowrap text-ellipsis">
            {text}
          </p>
        </div>
      </Link>
    </>
  );

  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    }
  }, []);

  const handleRequestLocationAccess = (route) => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;

        localStorage.setItem(
          "userLocation",
          JSON.stringify({ latitude, longitude })
        );

        console.log(latitude, longitude);
        setUserLocation({ latitude, longitude });

        router.push(route);
      });
    } else {
      // Geolocation not available
    }
  };

  const settings = {
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 2,
    arrows: true,
    draggable: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 5,
        },
        breakpoint: 400,
        settings: {
          slidesToShow: 4,
        },
      },
    ],
  };

  return (
    <>
      <Carousel
        {...settings}
        className="flex flex-row justify-between w-full gap-4 grid-container"
      >
        {categories.length > 0 &&
          categories
            .filter((category) => category && category.name)
            .map((category) => (
              <div key={category._id}>
                <Column
                  imageName={category?.image?.url}
                  text={`${category.name}`}
                  route={`/nearByProducts/${category._id}`}
                />
              </div>
            ))}
      </Carousel>
    </>
  );
};

export default NearBy;
