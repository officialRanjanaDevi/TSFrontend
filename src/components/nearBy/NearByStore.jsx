"use client";
import React, { useState, useEffect } from "react";
import NearbyStore from "./Nearby";
import axios from "axios";

const NearByStore = () => {
  const [userLocation, setUserLocation] = useState(null);
  const [allStores, setAllStores] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  useEffect(() => {
    const storedLocation = localStorage.getItem("userLocation");
    if (storedLocation) {
      setUserLocation(JSON.parse(storedLocation));
    }
  }, []);

  useEffect(() => {
    if (userLocation) {
      const api = `${serverURL}/api/v1/getNearByStores?latitude=${
        userLocation.latitude
      }&longitude=${userLocation.longitude}&maxDistance=${500000000000}`;
      axios
        .get(api)
        .then((res) => {
          console.log("res", res);
          setAllStores(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [userLocation, serverURL]);

  return <div className=""><NearbyStore allStores={allStores} /></div>;
};

export default NearByStore;
