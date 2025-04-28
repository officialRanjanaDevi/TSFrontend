import React, { useState } from 'react';
import Image from 'next/image';

const PriceFilter = ({ setSelectedFilters }) => {
	const [minPrice, setMinPrice] = useState(100);
	const [maxPrice, setMaxPrice] = useState(1000);
	const [min,setMin]=useState(minPrice);
	const [max,setMax]=useState(maxPrice)
	const [filterMenuOpen, setFilterMenuOpen] = useState(true);

	const handleFilterMenuOpen = () => {
		setFilterMenuOpen(!filterMenuOpen);
	};

	const handleMinPriceChange = (value) => {
		setMin(Number(value));
		setSelectedFilters((prevFilters) => ({
			...prevFilters, 
			minPrice: Number(value),  
		  }));
		  
	};

	const handleMaxPriceChange = (value) => {
		setMax(Number(value));
		setSelectedFilters((prevFilters) => ({
			...prevFilters, 
			maxPrice: Number(value),  
		  }));
		  
	};

	const handleFilterClick = (event) => {
		const selectedPriceRange = event.target.value;
		const [min, max] = selectedPriceRange.split('-').map(Number);
		setMinPrice(min);
		setMaxPrice(max);
		setMax(max);
		setMin(min)
		setSelectedFilters((prevFilters) => ({
			...prevFilters, 
			maxPrice: Number(max),
			minPrice:Number(min)  
		  }));
	};

	return (
		<div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
			<div className="flex flex-row justify-between w-full">
				<h4 className="font-bold">Price</h4>
				<Image
					className={`${
						!filterMenuOpen ? 'transform rotate-90 ' : ''
					} duration-200`}
					onClick={handleFilterMenuOpen}
					src="/images/keyboard_arrow_down.svg"
					width={20}
					height={20}
					alt="SVG map icon"
				/>
			</div>
			<div
				className={`flex flex-col items-start justify-start w-full gap-2 ${
					filterMenuOpen ? '' : 'hidden'
				} `}>
				<div className="flex flex-col items-start gap-2 w-full">
					<div className="flex flex-row justify-between bg-gray-700 text-white w-full p-1 rounded">
						<p>₹{min}</p>
						<p className="font-bold">to</p>
						<p>₹{max}</p>
					</div>
					<div className="flex w-full py-1">
						<input
							type="range"
							className="w-1/2 bg-[#B3B3B3] h-0.5 rounded-full accent-gray-700"
							min={minPrice}
							max={maxPrice} // Set the appropriate max value for your price range
							value={min}
							onChange={(e) => {
								handleMinPriceChange(e.target.value);
							}}
						/>
						<input
							type="range"
							className="w-1/2 bg-[#B3B3B3] h-0.5 rounded-full accent-gray-700"
							min={minPrice}
							max={maxPrice} // Set the appropriate max value for your price range
							value={max}
							onChange={(e) => {
								handleMaxPriceChange(e.target.value);
							}}
						/>
					</div>
				</div>

				<div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm">
				<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="100-1000"
							checked={minPrice === 100 && maxPrice === 1000}
							onChange={handleFilterClick}
						/>
						<span>₹1,00 - ₹1,000</span>
					</div>
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="1000-2000"
							checked={minPrice === 1000 && maxPrice === 2000}
							onChange={handleFilterClick}
						/>
						<span>₹1,000 - ₹2,000</span>
					</div>
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="2000-5000"
							checked={minPrice === 2000 && maxPrice === 5000}
							onChange={handleFilterClick}
						/>
						<span>₹2,000 - ₹5,000</span>
					</div>
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="5000-10000"
							checked={minPrice === 5000 && maxPrice === 10000}
							onChange={handleFilterClick}
						/>
						<span>₹5,000 - ₹10,000</span>
					</div>
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="10000-50000"
							checked={minPrice === 10000 && maxPrice === 50000}
							onChange={handleFilterClick}
						/>
						<span>₹10,000 - ₹50,000</span>
					</div>
					<div className="flex flex-row items-center gap-2.5 w-full cursor-pointer ">
						<input
							className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
							type="radio"
							name="priceRange"
							value="50000-100000"
							checked={minPrice === 50000 && maxPrice === 100000}
							onChange={handleFilterClick}
						/>
						<span>₹50,000 & Above</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PriceFilter;