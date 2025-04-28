"use client";
import React, { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { indianStates } from "./indiasStates";
import axios from "axios";

function EditAddress({ existingAddress, onSave, onCancel }) {
  const initialAddress =
    existingAddress && existingAddress.addressLine
      ? existingAddress.addressLine
      : "";
  const initialCity =
    existingAddress && existingAddress.city ? existingAddress.city : "";
  const initialState =
    existingAddress && existingAddress.state ? existingAddress.state : "";
  const initialPincode =
    existingAddress && existingAddress.pincode ? existingAddress.pincode : "";

  const [address, setAddress] = useState(initialAddress);
  const [city, setCity] = useState(initialCity);
  const [state, setState] = useState(initialState);
  const [pincode, setPincode] = useState(initialPincode);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const handleSubmit = (e) => {
    e.preventDefault();

    // Create a new address object with the updated values
    const updatedAddress = {
      ...existingAddress, // Include the existing address properties
      addressLine: address,
      city,
      state,
      pincode,
    };

    const api = `${serverURL}/api/v1/address/updateAddress/${existingAddress._id}`;
    axios
      .put(api, updatedAddress)
      .then((response) => {
        console.log(response.data);
        onSave(updatedAddress);
      })
      .catch((err) => console.error(err));

    setAddress("");
    setCity("");
    setState("");
    setPincode("");

    onCancel();
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded shadow-md w-96 h-66">
        <div className="flex flex-row justify-between p-3">
          <div className="font-semibold text-2xl mb-4">Edit Address</div>
          <div className="hover:cursor-pointer" onClick={onCancel}>
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
          {/* ... */}
          <div className="flex justify-full">
            <button
              type="submit"
              className="bg-gradient-to-b from-primary to-secondary text-white font-semibold py-2 rounded-md hover:bg-red-600 w-full"
            >
              Save Address
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditAddress;
