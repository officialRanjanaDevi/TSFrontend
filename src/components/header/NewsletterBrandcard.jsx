import React from 'react';
import Link from 'next/link';
const img_fashion = '/images/clothing/MShirt.svg';

const BrandCard = ({ store, key }) => {
	return (
		<Link href={`/nearByStore/store?storeId=${store._id}`}>
				<div className="relative my-2 flex justify-center items-center" >
					<img
						
						src={
							store?.images[0]?.url?.includes("imgur")? img_fashion
							  : store?.images[0]?.url
						  }
						alt="Deal imgee"
						className=" h-60 w-64 "
					/>
					<div className="absolute w-48 -bottom-6 rounded -mt-10">
						<div className="bg-white p-1 shadow-md">
							<div className="mt-1 font-medium uppercase justify-center flex text-sm md:text-base">
								Brands
							</div>
							<div className="mt-1 text-center text-sm text-[#22191C] font-400 pb-2">
								Up to {Math.floor(Math.random() * (45 - 35 + 1)) + 40}% OFF
							</div>
						</div>
					</div>
				</div>
				</Link>
	);
};

export default BrandCard;