import React from 'react';
import Image from 'next/image';

const Offercard = ({coupon,handleCouponSelected}) => {
	
	return (
		<div>
			<p className=" text-[#18181B] font-normal  mb-3 text-[14px]">
				{ coupon && coupon.discount} Instant Discount on HDFC Bank Credit and Debit Cards on min spend on
				Rs. 2,000{' '}
			</p>
			<div className="flex bg-[#EBD0B0] w-[193px] rounded h-[60px] border-dashed border-2 border-[#EB8105]" >
				<div className="w-4/5 h-full border-r-2  border-dashed border-[#EB8105] overflow-hidden">
					<h3 className="text-[12px] ml-[5px] mt-[5px]">Your Referal Code:</h3>
					<h3 className="text-[12px] ml-[5px] text-[#EB8105]">{ coupon && coupon.code}</h3>
				</div>
				<div className="w-1/5" onClick={()=>handleCouponSelected(coupon)}>
					{/* <img
						src="/images/Copy.svg"
						alt="Copy Icon"
						className="mx-[7px] my-[13px]"
						
					/> */}
					<Image
						width={20}
						height={20}
						src="/images/Copy.svg"
						alt="Copy Icon"
						className="mx-[7px] my-[13px]"
						
					/>
				</div>
			</div>
		</div>
	);
};

export default Offercard;
