import React from 'react';
import { useUser } from '../../UserContext';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import AddressForm from './AddressForm.';
const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;
const Address = () => {
	const { user } = useUser();
	const [address, setAddress] = useState(null);
	const [newAddress, setNewAddress] = useState(false);
	const [addressEdit, setAddressEdit] = useState(false);
    
	
	const handleAdressSubmit = () => {
		setNewAddress(false);
		setAddressEdit(false);
	};
	const deleteAddress = async () => {
		try {
			const deleteAddressUrl = `${serverURL}/api/v1/address/${address._id}`;
			await axios.delete(deleteAddressUrl);
			console.log('deleted successfully');
			setAddress(null);
			// You may want to refetch the addresses or update the UI accordingly
			// Example: refetchAddresses();
		} catch (error) {
			console.error(error);
		}
	};
	
useEffect(() => {
  const customerAddress = async () => {
    try {
      const CustomerAddressUrl = `${serverURL}/api/v1/address/${user.role=="customer"?"user":user.role}/${user._id}`;
      const res = await axios.get(CustomerAddressUrl);

      let addresses = res.data;
      setAddress(res.data[res.data.length?res.data.length-1:0])
    } catch (error) {
      console.error(error);
    }
  };

  customerAddress();
},[newAddress]);
	console.log("adress",address);
	return (
		<div className="w-full">
			
				<div>
					
					{address && 
					<div
						className={`flex items-center text-sm  ${
							newAddress ? 'hidden' : ''
						}`}>
						<input type="radio" name="address" id="address1" className="mr-2" />
						<div className="flex ">
							<div className="relative ">
								<label htmlFor="address1" className="text-lg ">
									<div className="flex  mt-[20px]">
										<h4 className="font-thin">Deliver to: </h4>
										<h4 className="font-bold">
											{address ? `${address.fullName}` : ''}
										</h4>
									</div>
								</label>
								<p className="mt-1">
									{address
										? `${address.landmark}, ${address.addressLine}, ${address.city}, ${address.state}, ${address.pincode}, ${address.country}`
										: ''}
								</p>
								<p>Contact : {address ? `${address.PhoneNumber}` : ''}</p>
								<div className="absolute flex justify-start top-6 right-4 lg:right-3">
									<Image
										height={20}
										width={20}
										alt="Pen"
										src="/images/pen.svg"
										className=""
										onClick={() => {
											setNewAddress(true);
											setAddressEdit(true);
										}}
									/>
									<Image
										height={20}
										width={20}
										alt="Pen"
										src="/images/bin.svg"
										className="ml-[5px]"
										onClick={() => {
											// Call the function to delete the address
											deleteAddress();
										}}
									/>
								</div>
							</div>
						</div>
					</div>
                   }
					<div className={`${newAddress ? 'hidden' : ''}`}>
						<Image
							height={100}
							width={100}
							src="/images/AddNew.svg"
							alt=''
							className="pt-1 cursor-pointer"
							onClick={() => {
								setNewAddress(true);
							}}
						/>
					</div>

					<div
						className={` flex flex-col relative mt-2   ${
							newAddress ? '' : 'hidden'
						}`}>

						{user._id && <AddressForm
							onAddressSubmit={handleAdressSubmit}
							isEditEnabled={addressEdit}
							Address={address}
							user={user}
						/>
                        }
						<Image
							className=" ml-[80px] sm:ml-[90px] lg:ml-[30px]  mb-auto absolute end-20"
							src="/images/x.svg"
							alt="Image"
							width={20}
							height={20}
							onClick={handleAdressSubmit}
						/>
					</div>
				</div>
			
		</div>
	);
};

export default Address;
