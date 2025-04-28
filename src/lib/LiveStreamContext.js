"use client";
import React, { createContext, useContext, useState } from "react";

const RoomContext = createContext();

export const useRoom = () => {
  return useContext(RoomContext);
};

export const RoomProvider = ({ children }) => {
  const [roomID, setRoomID] = useState(null);

  return (
    <RoomContext.Provider value={{ roomID, setRoomID }}>
      {children}
    </RoomContext.Provider>
  );
};
