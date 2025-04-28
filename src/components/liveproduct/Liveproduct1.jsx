"use client";
import React, { useState, useEffect, useCallback, useContext } from "react";
import LiveproductChat from "./LiveproductChat";
import Image from "next/image";
import LiveProductSide from "./LiveProcuctSide";
import ShopnowSide from "./ShopnowSide";
import axios from "axios";
import StorePasgNew from "./StorePasgNew";
import { UserContext } from "@/lib/UserContext";
import { toast } from "react-hot-toast";
import { message } from "antd";
import Link from "next/link";
function Liveproduct1({ data }) {
  // console.log("fetchstoreID", data);
  const [isPlaying, setPlaying] = useState(true);
  const [selectedStoreProducts, setSelectedStoreProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [chatId, setChatId] = useState(null);
  const productsPerPage = 4; // Set the desired number of products per page
  const [liveMeetings, setLiveMeetings] = useState([]);
  const togglePlay = () => {
    setPlaying(!isPlaying);
  };

  const [authenticated, setAuthenticated] = useContext(UserContext);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;


  useEffect(() => {
    const fetchLiveDemoProducts = async () => {
      const customerId = authenticated.user._id;
      try {
        const response = await axios.get(
          `${serverURL}/api/v1/liveDemo/${customerId}`
        );

        const data = response.data;

        if (Array.isArray(data) && data.length > 0 && data[0].items) {
          setSelectedStoreProducts(data[0].items);
        } else {
          console.warn("Invalid live demo products data format:", data);
        }
      } catch (error) {
        console.error("Error fetching live demo products:", error);
      }
    };
    if (authenticated.user && authenticated.user._id) {
      fetchLiveDemoProducts();
    }
  }, [serverURL, authenticated.user]);

  // Calculate the index of the first and last product on the current page
  // Calculate the index of the first and last product on the current page
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const displayedProducts = selectedStoreProducts.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(selectedStoreProducts.length / productsPerPage);

  // Function to handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage();
  };

  useEffect(() => {
    const fetchByStoreId = async () => {
      try {
        if (authenticated.user._id) {
          const res = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/getChat/${data._id}/${authenticated.user._id}`
          );
          const chatData = res.data;

          if (chatData._id) {
            setChatId(chatData._id);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchByStoreId();
  }, [data._id, authenticated.user]);

  const startNewChat = async () => {
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/createMessage`,
        {
          storeId: data._id,
          userId: authenticated.user._id,
          sender: authenticated.user._id,
          content: `Hello, This Side ${authenticated.user?.name}`,
        }
      );
      const chatData = res.data;
      setChatId(chatData._id);
      toast.success("Chat started successfully");
    } catch (error) {
      toast.error("Failed to start a new chat");
      console.error("Start Chat Error:", error);
    }
  };
  useEffect(() => {
    const fetchMeetings = async () => {
      if (authenticated.user._id) {


        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/meetings/${authenticated.user._id}`
          );
          setLiveMeetings(response.data.liveMeetings);

        } catch (error) {
          console.error("Error fetching meetings:", error);
        }
      }
    };

    fetchMeetings();
  }, [authenticated]);
  return (
    <>
      <div className="md:mx-20">
        <div className="flex flex-col items-center justify-center p-1 mx-5 md:mx-37">
          <div className="w-full">
            {isPlaying ? (
              <div
                style={{
                  position: "relative",
                  paddingBottom: "56.25%",
                  height: 0,
                }}
              >
                <iframe
                  title="YouTube Video"
                  style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                  }}
                  src="https://www.youtube.com/embed/H0GiMQj3OIk"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              </div>
            ) : (
              <Image
                width={500}
                height={500}
                src="/images/goLiveSale.png"
                alt=""
                className="w-full h-auto cursor-pointer"
                onClick={togglePlay}
              />
            )}
          </div>
        </div>

        <div className="2xl:flex lg:flex mx-5 gap-[40px] px-1">
          <div className="">
            <LiveProductSide data={data} />
          </div>

          <div className="w-full">
            <div className="">
              <ShopnowSide store={data}/>
            </div>

            <div className="mt-5">
              <LiveproductChat
                chatId={chatId}
                userId={authenticated.user._id}
                userName={authenticated.user?.name}
                storeId={data._id}
                startNewChat={startNewChat}
                storeData={data}
                userDp={authenticated.user?.profilePic?.url}
              />
            </div>
          </div>
        </div>
        <div className="mt-8">
          {liveMeetings ? <div>
            <h2 className="text-xl font-bold mb-2">Live Meetings</h2>
            <div className="grid gap-2 grid-cols-2 lg:grid-cols-3  xl:grid-cols-5">

              {liveMeetings.map((item, index) => (
                <div
                  key={index}
                  className="rounded-md border-2 border-green-200 overflow-hidden max-w-52 "
                >
                  <div className="p-2 text-[12px] sm:text-sm">
                    <h3 className="text-sm sm:text-lg font-semibold">{item.title}</h3>
                    <p>Status: {item.status}</p>
                    <p>Date: {new Date(item.date).toLocaleDateString()}</p>
                    <p>Time: {new Date(item.time).toLocaleDateString()}</p>
                    <p>For Product:</p>

                    <div className="inline-flex gap-2 overflow-x-auto">
                      {item.products.map((product, index) => {
                        return (
                          <img

                            key={index}
                            src={product?.productImage}
                            alt={product.productName}
                            className="rounded-lg h-48 w-full "
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="w-full bg-green-200 p-2 text-center">
                    <Link
                      className="bg-green-700 text-white rounded-lg px-2 py-1"
                      href={`/livemeeting/meeting/${item._id}`}
                    >
                      Join Video Call
                    </Link>
                  </div>
                </div>
              ))}</div>
          </div> : <></>}
        </div>
        <div className="">
         
          <StorePasgNew  storeData={data} />
         
        </div>
      </div>
    </>
  );
}

export default Liveproduct1;
