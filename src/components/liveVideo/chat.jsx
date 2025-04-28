"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("process.env.NEXT_PUBLIC_BASE_API_URL_SELLER");

const Chat = ({ chatId, userId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [error, setError] = useState(null);

  // Function to fetch initial messages when component mounts
  const fetchInitialMessages = async () => {
    try {
      // Replace with your API endpoint to fetch initial messages
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL_SELLER}/api/v1/getChat/${chatId}/${userId}`
      );
      if (!response.ok) {
        throw new Error(`Failed to fetch messages: ${response.statusText}`);
      }
      const data = await response.json();
      setMessages(data.messages || []);
    } catch (error) {
      console.error("Fetch error:", error);
      setError(error.message || "Failed to fetch messages");
    }
  };

  useEffect(() => {
    // Fetch initial messages when component mounts
    fetchInitialMessages();

    // Join chat room upon connection
    socket.emit("joinChat", chatId);

    // Listen for new messages
    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    // Handle socket errors
    socket.on("error", (error) => {
      console.error("Socket error:", error);
      setError(error.message || "Socket connection error");
    });

    return () => {
      // Clean up socket listeners
      socket.off("receiveMessage");
      socket.off("error");
    };
  }, [chatId]);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      const message = {
        chatId,
        sender: userId,
        content: newMessage,
      };
      socket.emit("sendMessage", message);
      setNewMessage("");
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-4 p-4 rounded ${
              msg.sender === userId
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-black"
            }`}
          >
            <div className="font-semibold">{msg.sender}</div>
            <div>{msg.content}</div>
            <div className="text-sm text-gray-600">
              {new Date(msg.timestamp).toLocaleTimeString()}
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-white flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border rounded p-2 mr-2"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white p-2 rounded"
        >
          Send
        </button>
      </div>
      {error && <div className="p-4 bg-red-500 text-white">Error: {error}</div>}
    </div>
  );
};

export default Chat;
