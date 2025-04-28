"use client";
import { useState, useEffect, createContext } from "react";

const LocationContext = createContext();

const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState({
    lat: "",
    long: "",
    addressLine: "",
    fullName:"",
    PhoneNumber:"",
    pincode:"",
    state:"",
    city:""
  });

  useEffect(() => {
    const getLocation = async () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;

              // Fetch the address using OpenStreetMap API
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
              );
              const data = await response.json();
              setLocation({
                lat: latitude,
                long: longitude,
                addressLine: data.display_name || "Address not found",
                pincode:data.address.postcode,
                state:data.address.state,
                city:data.address.city
              });

            } catch (error) {
              console.error("Error fetching address:", error);
            }
          },
          (error) => {
            console.error("Error getting location:", error.message);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);


  return (
    <LocationContext.Provider value={[location, setLocation]}>
      {children}
    </LocationContext.Provider>
  );
};

export { LocationProvider, LocationContext };
