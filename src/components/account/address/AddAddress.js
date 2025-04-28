"use client";
import React, { useState, useEffect, useContext } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { indianStates } from "./indiasStates";
import axios from "axios";
import { UserContext } from "@/lib/UserContext";

function AddAddress({ onClose, onAdd }) {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [pincode, setPincode] = useState("");
  const [country, setCountry] = useState("India");
  const [location, setLocation] = useState([]);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        localStorage.setItem(
          "userLocation",
          JSON.stringify({ latitude, longitude })
        );
      });
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const api = `${serverURL}/api/v1/addressCreation`;
    if (authenticated.user) {
      axios
        .post(api, {
          refId: authenticated.user?._id,
          type: "home",
          for: "user",
          fullName: authenticated.user?.name,
          PhoneNumber: authenticated.user?.phone_number,
          addressLine: address,
          city,
          pincode,
          state,
          country,
        })
        .then((res) => {
          console.log(res.data);
          onAdd(res.data);
        })
        .catch((err) => console.error(err));
    }

    // console.log('Address:', address);
    // console.log('city', city);
    // console.log('State:', state);
    // console.log('Pincode:', pincode);
    // console.log('Location', location)

    setAddress("");
    setCity("");
    setState("");
    setPincode("");

    onClose();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-96 h-66">
        <div className="flex flex-row justify-between p-3">
          <div className="font-semibold text-2xl mb-4">Add New Address</div>
          <div className="hover:cursor-pointer " onClick={onClose}>
            <AiOutlineClose size={20} />
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="address"
              className="w-full border rounded-md p-2"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="city"
              className="w-full border rounded-md p-2"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <select
              id="state"
              className="w-full border rounded-md p-2"
              value={state}
              onChange={(e) => setState(e.target.value)}
              required
            >
              <option value="">Select state</option>
              {indianStates.map((s, index) => (
                <option key={index} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              id="pincode"
              className="w-full border rounded-md p-2"
              placeholder="Pin code"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-gradient-to-b from-primary to-secondary rounded hover:bg-red-600 text-black px-4 py-1"
          >
            Add Address
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddAddress;
