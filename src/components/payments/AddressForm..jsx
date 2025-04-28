"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

const AddressForm = ({ onAddressSubmit, isEditEnabled, Address, user }) => {
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
  const indianStates = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
    "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
    "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya",
    "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim",
    "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand",
    "West Bengal",
  ];

  const [formData, setFormData] = useState({
        fullName: Address.fullName || "",
        phoneNumber: Address.phoneNumber || "",
        roadName: Address.addressLine || "",
        landmark: Address.landmark || "",
        pincode: Address.pincode || "",
        state: Address.state || "",
        city: Address.city || "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditEnabled && Address) {
      const addressData =  Address; 

      setFormData({
        fullName: addressData.fullName || "",
        phoneNumber: addressData.phoneNumber || "",
        roadName: addressData.addressLine || "",
        landmark: addressData.landmark || "",
        pincode: addressData.pincode || "",
        state: addressData.state || "",
        city: addressData.city || "",
      });
    }
  }, [isEditEnabled, Address]);

  // Generic Input Handler
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Form Validation
  const validateForm = () => {
    const requiredFields = ["fullName", "phoneNumber", "roadName", "pincode", "state", "city"];
    const emptyFields = requiredFields.filter((field) => !formData[field].trim());

    if (emptyFields.length > 0) {
      alert(`Please fill in the required fields: ${emptyFields.join(", ")}`);
      return false;
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      alert("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!/^\d{6}$/.test(formData.pincode)) {
      alert("Please enter a valid 6-digit pincode.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const formDetails = {
      ...formData,
      type: "home",
      for: user.role === "customer" ? "user" : user.role,
      refId: user._id,
    };

    try {
      if (isEditEnabled && Address?._id) {
        const updateUrl = `${serverURL}/api/v1/address/updateAddress/${Address._id}`;
        await axios.put(updateUrl, formDetails);
      } else {
        await axios.post(`${serverURL}/api/v1/addressCreation`, formDetails);
      }

      setFormData({
        fullName: "",
        phoneNumber: "",
        roadName: "",
        landmark: "",
        pincode: "",
        state: "",
        city: "",
      });

      onAddressSubmit();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="overflow-hidden ps-3 sm:ps-0">
      <h6>{isEditEnabled ? "Update Location" : "Add New Location"}</h6>

      <div className="flex justify-between sm:gap-2 sm:flex-row flex-col mt-3 w-3/4">
        <div className="flex flex-col">
          <p>Full Name</p>
          <input
            type="text"
            name="fullName"
            placeholder="Full Name required*"
            className="focus:outline-none p-2"
            value={formData.fullName}
            onChange={handleInputChange}
          />
          <hr className="border-t-2" />
        </div>
        <div className="flex flex-col">
          <p>Phone Number</p>
          <input
            type="text"
            name="phoneNumber"
            placeholder="Phone Number required*"
            className="focus:outline-none p-2"
            value={formData.phoneNumber}
            onChange={handleInputChange}
          />
          <hr className="border-t-2" />
        </div>
      </div>

      <div className="flex flex-col w-3/4 mt-2">
        <p>Road name, Area, Colony</p>
        <input
          type="text"
          name="roadName"
          placeholder="Road name, Area, Colony"
          className="focus:outline-none p-2"
          value={formData.roadName}
          onChange={handleInputChange}
        />
        <hr className="border-t-2" />
      </div>

      <div className="flex justify-between sm:gap-2 sm:flex-row flex-col mt-3 w-3/4">
        <div className="flex flex-col">
          <p>Add Landmark</p>
          <input
            type="text"
            name="landmark"
            placeholder="Optional"
            className="focus:outline-none p-2"
            value={formData.landmark}
            onChange={handleInputChange}
          />
          <hr className="border-t-2" />
        </div>
        <div className="flex flex-col">
          <p>Enter Pincode</p>
          <input
            type="text"
            name="pincode"
            placeholder="Pincode required*"
            className="focus:outline-none p-2"
            value={formData.pincode}
            onChange={handleInputChange}
          />
          <hr className="border-t-2" />
        </div>
      </div>

      <div className="flex justify-between sm:gap-2 sm:flex-row flex-col mt-3 w-3/4">
        <div className="flex flex-col">
          <p>Enter Your City</p>
          <input
            type="text"
            name="city"
            placeholder="City required*"
            className="focus:outline-none p-2"
            value={formData.city}
            onChange={handleInputChange}
          />
          <hr className="border-t-2" />
        </div>
        <div className="flex flex-col">
          <p>State</p>
          <select
            name="state"
            className="border border-gray-300 focus:border-transparent focus:outline-none p-2"
            value={formData.state}
            onChange={handleInputChange}
          >
            <option value="" disabled>Select a State</option>
            {indianStates.map((state) => (
              <option key={state} value={state}>{state}</option>
            ))}
          </select>
          <hr className="border-t-2" />
        </div>
      </div>

      <div>
        <button
          type="submit"
          className="px-2 p-2 font-body bg-[#eb8105] rounded-lg mt-4"
          disabled={loading}
        >
          {loading ? "Saving..." : isEditEnabled ? "Update Address" : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default AddressForm;
