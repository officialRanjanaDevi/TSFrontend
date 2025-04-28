"use client";
import React, { useState, useEffect, useContext } from "react";
import RemoveAddress from "./RemoveAddress";
import AddAddress from "./AddAddress";
import EditAddress from "./EditAddress";
import { UserContext } from "@/lib/UserContext";

const AddressComponent = () => {
  const [authenticated, setAuthenticated] = useContext(UserContext);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [addressToDelete, setAddressToDelete] = useState(null); // Store the address to delete
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [showEditAddress, setShowEditAddress] = useState(false);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

  useEffect(() => {
    if (authenticated.user?._id) {
      // Define the API URL with the type and refId
      const apiUrl = `${serverURL}/api/v1/address/user/${authenticated.user?._id}`;

      // Fetch data from the API
      fetch(apiUrl)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          // Update addresses state with the fetched data
          setAddresses(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [serverURL, authenticated.user]);

  const handleRemoveClick = (address) => {
    // Set the address to delete
    setAddressToDelete(address);

    // Show the confirmation dialog
    setShowConfirmation(true);
  };

  const handleAddAddress = (newAddress) => {
    const newAddresses = [...addresses, newAddress];
    setAddresses(newAddresses);
  };

  const handleEditAddress = (updatedAddress) => {
    // Find the index of the edited address in the addresses array
    const addressIndex = addresses.findIndex(
      (address) => address._id === updatedAddress._id
    );

    if (addressIndex !== -1) {
      // Create a new array with the updated address
      const updatedAddresses = [...addresses];
      updatedAddresses[addressIndex] = updatedAddress;

      // Update the addresses state with the new array
      setAddresses(updatedAddresses);

      // Close the "Edit Address" component
      setShowEditAddress(false);
    }
  };
  const toggleAddAddress = () => {
    setShowAddAddress(!showAddAddress);
  };

  const toggleEditAddress = () => {
    setShowEditAddress(!showEditAddress);
  };

  const handleDeleteAddress = () => {
    // Check if there is an address to delete
    if (addressToDelete) {
      // Make an API call to delete the address using the address._id
      const apiUrl = `${serverURL}/api/v1/address/${addressToDelete._id}/status`;

      fetch(apiUrl, {
        method: "DELETE",
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then(() => {
          // Remove the deleted address from the addresses state
          setAddresses((prevAddresses) =>
            prevAddresses.filter(
              (address) => address._id !== addressToDelete._id
            )
          );
        })
        .catch((error) => {
          console.error("Error deleting address:", error);
        });
    }

    // Close the confirmation dialog
    setShowConfirmation(false);
  };

  return (
    <div className="relative">
      <div className="px-6">
        <div className="flex justify-between p-2 items-center">
          <div className="font-bold font-Poppins font-500 text-gray-900">
            Saved Addresses
          </div>
          <button
            className="text-gray-900 font-bold p-2 rounded border"
            onClick={() => setShowAddAddress(true)}
          >
            + ADD NEW ADDRESS
          </button>
        </div>

        {addresses?.length > 0 ? (
          addresses.map((address, index) => (
            <div
              className="w-full items-center shadow-lg my-10"
              key={address._id}
            >
              <div className="box-shadow p-10 -mt-5">
                <div className="font-bold font-poppins uppercase">
                  {address.type} Address
                </div>
                <div className="flex justify-between items-center my-5">
                  <div className="font-bold">{address.addressLine}</div>
                  <button className="text-black font-bold py-2 px-4 rounded border bg-gray-200">
                    {address.type}
                  </button>
                </div>
                <div className="text-left text-gray-500 my-2">
                  {`${address.city}, ${address.state} ${address.pincode}, ${address.country}`}
                </div>
                <div className="text-gray-500 my-2">
                  Status: {address.status}
                </div>
                <hr className="border border-gray-400 mt-2" />
                <div className="flex justify-between text-center mt-0 mx-auto">
                  <button
                    className="font-bold text-center mx-auto text-orange-500"
                    onClick={() => {
                      setAddressToEdit(address);
                      setShowEditAddress(true);
                    }}
                  >
                    EDIT
                  </button>
                  <hr className="border border-gray-400 mx-4 h-9" />
                  <button
                    className="font-bold rounded text-center mx-auto text-orange-500"
                    onClick={() => handleRemoveClick(address)}
                  >
                    REMOVE
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No Address Saved Yet!</p>
        )}
      </div>
      {showConfirmation && (
        <RemoveAddress
          address={addressToDelete}
          onDelete={handleDeleteAddress}
          onCancel={() => setShowConfirmation(false)}
        />
      )}
      {/* {showAddAddress && (
				<AddAddress
					onAdd={handleAddAddress}
					onCancel={() => setShowAddAddress(false)}
				/>
			)} */}

      {showAddAddress && (
        <AddAddress onAdd={handleAddAddress} onClose={toggleAddAddress} />
      )}
      {showEditAddress && (
        <EditAddress
          existingAddress={addressToEdit}
          onSave={handleEditAddress} // You need to define handleEditAddress function
          onCancel={() => toggleEditAddress()}
        />
      )}
    </div>
  );
};

export default AddressComponent;
