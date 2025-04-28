"use client";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import io from "socket.io-client";
import { BsDot } from "react-icons/bs";
import ReportUserPopup from "./ReportPopup";
import { format, isToday, isYesterday } from "date-fns";

const socket = io(process.env.NEXT_PUBLIC_BASE_API_URL);

export function formatLastMessageTime(dateString) {
  const date = new Date(dateString);

  if (isToday(date)) {
    return format(date, "HH:mm");
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "MM/dd/yyyy");
  }
}

const LiveproductChat = ({
  storeData,
  startNewChat,
  storeId,
  chatId,
  userId,
  userDp,
  userName,
}) => {
  const [inputMessage, setInputMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [onlineStatus, setOnlineStatus] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chatContainerRef = useRef();
  const intervalRef = useRef();
  const [showReportPopup, setShowReportPopup] = useState(false);
  const [menu, setMenu] = useState(false);
  const menuRef = useRef();
  const [onlineUsers, setOnlineUsers] = useState(new Set());

  const handleInputChange = (event) => {
    setInputMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim() !== "") {
      const newMessage = {
        chatId,
        id: messages.length + 1,
        msgByUserId: userId,
        text: inputMessage,
        sender: userId,
        receiver: storeId,
      };
      socket.emit("sendMessage", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setInputMessage("");
    }
  };

  const handleMoreClick = () => {
    setMenu((prevMenu) => !prevMenu);
  };

  const handleCloseReportPopup = () => {
    setShowReportPopup(false);
  };

  useEffect(() => {
    const fetchInitialMessages = async () => {
      if (!storeId || !userId) {
        setIsLoading(false);
        return;
      }
      socket.emit("message-page", {
        msgByUserId: userId,
        currUser: storeId,
      });
      setIsLoading(false);
    };

    // Fetch initial messages when component mounts
    fetchInitialMessages();

    if (chatId && storeId) {
      socket.emit("joinChat", { chatId, userId });
    }

    socket.on("message", (data) => {
      // console.log("message data", data);
      setMessages(data);
    });

    socket.emit("seen", { msgByUserId: userId, currUser: storeId });

    socket.on("onlineUser", (users) => {
      setOnlineUsers(new Set(users));
    });

    socket.on("updateUserStatus", ({ userId, online }) => {
      setOnlineStatus((prevStatus) => ({
        ...prevStatus,
        [userId]: online,
      }));
      console.log("onlineStatus", onlineStatus);
    });

    socket.on("error", (error) => {
      console.error("Socket error:", error);
      setError(error.message || "Socket connection error");
    });

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Clean up socket listeners and interval
      socket.off("receiveMessage");
      socket.off("updateUserStatus");
      socket.off("error");
      document.addEventListener("mousedown", handleClickOutside);
      clearInterval(intervalRef.current);
    };
  }, [chatId, userId]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full">
        Connecting...
      </div>
    );
  }
  const isUserOnline = (userId) => onlineUsers.has(userId);

  const isStoreOnline = isUserOnline(storeId);

  return (
    <div className="flex bg-gray-100 flex-col w-full border-2">
      <div className="flex items-center bg-white justify-between h-20 p-2">
        <div className="flex flex-col gap-2">
          {/* <div class="flex text-xs w-fit items-center rounded-full border text-red-700 border-red-500 px-2">
            <BsDot size={24} />
            Live
          </div> */}
          <div className="flex flex-row justify-center items-center gap-3">
            <img
              src={storeData?.images[0]?.url}
              className="w-10 h-10 rounded-full"
              alt={storeData?.storeName}
            />
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold">
                {" "}
                {storeData?.storeName}
              </span>
              <span
                className={`inline-flex items-center w-fit text-xs justify-center rounded-full px-2.5 py-0.5 ${
                  isStoreOnline
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {isStoreOnline ? "Online" : "Offline"}
              </span>
            </div>
            {/* <Image
              width={30}
              height={30}
              src="/images/keyboard_arrow_down.svg"
              alt=""
            /> */}
          </div>
        </div>
        <div onClick={handleMoreClick} className="relative items-center">
          <Image
            width={500}
            height={500}
            src="/images/mor.jpeg"
            alt=""
            className="w-5"
          />
          {menu && (
            <div
              ref={menuRef}
              className="absolute end-0 z-10 mt-2 max-w-56 rounded-md border border-gray-100 bg-white shadow-lg"
              role="menu"
            >
              <div className="p-2">
                <button
                  onClick={() => setShowReportPopup(true)}
                  className="block whitespace-nowrap rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700"
                  role="menuitem"
                >
                  Report User
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      {chatId ? (
        <>
          <div className="flex flex-col 2xl:h-[106vh] xl:h-[97vh]">
            <hr />

            <div className="flex-1 p-4 overflow-y-auto" ref={chatContainerRef}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`mb-4 flex ${
                    message.msgByUserId === userId
                      ? "justify-end"
                      : "items-start"
                  }`}
                >
                  {/* {message.sender !== userId && (
                      <Image
                        width={500}
                        height={500}
                        src={"/images/bed.png"}
                        alt="Sender DP"
                        className="flex flex-col w-12 h-12 mr-2 rounded-full"
                      />
                    )} */}
                  <div
                    className={`${
                      message.msgByUserId === userId
                        ? "bg-[#EB8105] text-white rounded-md"
                        : "bg-white  border-gray-300  border-[px] py-2 px-4"
                    } p-2 items-start sm:max-w-fit w-[75%] flex-row px-4`}
                  >
                    {message.text}
                    <p className="flex justify-end text-xs">
                      {message?.updatedAt
                        ? formatLastMessageTime(message?.updatedAt)
                        : ""}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 flex items-center justify-between bg-white border-t">
              <input
                type="text"
                value={inputMessage}
                onChange={handleInputChange}
                placeholder="Type here..."
                className="w-full p-2 border rounded"
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              />
              <button
                onClick={handleSendMessage}
                className="p-2 text-white rounded"
              >
                <Image
                  width={500}
                  height={500}
                  src="/images/send3.svg"
                  className="w-8 bg-black p-2 rounded-full mx-3 h-8"
                  alt="Send"
                />
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="my-auto text-center items-center">
          <button
            onClick={startNewChat}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Start Chat
          </button>
        </div>
      )}
      {error && <div className="p-4 bg-red-500 text-white">Error: {error}</div>}
      {showReportPopup && (
        <ReportUserPopup
          onClose={handleCloseReportPopup}
          storeDp={storeData?.images[0]?.url}
          storeName={storeData?.storeName}
          userId={userId}
          chatId={chatId}
          storeId={storeId}
        />
      )}
    </div>
  );
};

export default LiveproductChat;
