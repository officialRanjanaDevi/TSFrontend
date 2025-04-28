import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

const FilterListSvg = (
	<svg
		width="16"
		height="17"
		viewBox="0 0 16 17"
		fill="none"
		xmlns="http://www.w3.org/2000/svg">
		<rect
			x="16"
			y="0.5"
			width="16"
			height="16"
			rx="8"
			transform="rotate(90 16 0.5)"
			fill="#B3B3B3"
		/>
	</svg>
);

const districtNames = [
	'Mini Tractor',
	'DigiTrac',
	'Tractors',
	'Escorts',
	'FarmTrac',
];

const DistrictFilter = ({ setSelectedFilters }) => {
	const [filterMenuOpen, setFilterMenuOpen] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [districtSelected, setDistrictSelected] = useState('');
	const filterMenuRef = useRef(null);
	const scrollbarThumbRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		districtNames.filter((district) => {
			if (district.toLowerCase().includes(e.target.value.toLowerCase())) {
				handleFilterClick(district);
			}
		})

	};

	const handleFilterMenuOpen = () => {
		setFilterMenuOpen(!filterMenuOpen);
	};

	const handleFilterClick = (district) => {
		setDistrictSelected(district);
		setSelectedFilters({ districtSelected: district });
	};

	const handleScroll = () => {
		const filterMenu = filterMenuRef.current;
		const scrollbarThumb = scrollbarThumbRef.current;
		if (filterMenu && scrollbarThumb) {
			const scrollPercentage =
				(filterMenu.scrollTop /
					(filterMenu.scrollHeight - filterMenu.clientHeight)) *
				100;
			scrollbarThumb.style.top = `${scrollPercentage}%`;
		}
	};

	useEffect(() => {
		const scrollbarThumb = scrollbarThumbRef.current;
		if (scrollbarThumb) {
			const handleMouseMove = (e) => {
				if (isDragging) {
					const filterMenu = filterMenuRef.current;
					const scrollableArea =
						filterMenu.scrollHeight - filterMenu.clientHeight;
					const mouseY = e.clientY - filterMenu.getBoundingClientRect().top;
					const scrollPercentage = (mouseY / filterMenu.clientHeight) * 100;
					filterMenu.scrollTop = (scrollableArea * scrollPercentage) / 100;
				}
			};

			const handleMouseUp = () => {
				setIsDragging(false);
			};

			scrollbarThumb.addEventListener('mousemove', handleMouseMove);
			scrollbarThumb.addEventListener('mouseup', handleMouseUp);

			return () => {
				scrollbarThumb.removeEventListener('mousemove', handleMouseMove);
				scrollbarThumb.removeEventListener('mouseup', handleMouseUp);
			};
		}
	}, [isDragging]);

	return (
		<div className="flex flex-col items-center py-2 gap-2 w-full border-b-2 border-gray-300">
			<div className="flex flex-row justify-between w-full">
				<h4 className="font-bold">District</h4>
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
				<div className="flex flex-col items-start shadow-sm w-full bg-white">
					<div className="flex flex-col justify-center items-start px-1 py-1 gap-2.5 w-full">
						<div className="flex flex-row justify-center items-center gap-1">
							<svg
								width="18"
								height="18"
								viewBox="0 0 18 18"
								fill="none"
								xmlns="http://www.w3.org/2000/svg">
								<g clipPath="url(#clip0_51_17689)">
									<path
										d="M11.625 10.5H11.0325L10.8225 10.2975C11.5575 9.4425 12 8.3325 12 7.125C12 4.4325 9.8175 2.25 7.125 2.25C4.4325 2.25 2.25 4.4325 2.25 7.125C2.25 9.8175 4.4325 12 7.125 12C8.3325 12 9.4425 11.5575 10.2975 10.8225L10.5 11.0325V11.625L14.25 15.3675L15.3675 14.25L11.625 10.5ZM7.125 10.5C5.2575 10.5 3.75 8.9925 3.75 7.125C3.75 5.2575 5.2575 3.75 7.125 3.75C8.9925 3.75 10.5 5.2575 10.5 7.125C10.5 8.9925 8.9925 10.5 7.125 10.5Z"
										fill="black"
									/>
								</g>
								<defs>
									<clipPath id="clip0_51_17689">
										<rect width="18" height="18" fill="white" />
									</clipPath>
								</defs>
							</svg>
							<div className="border-l-2 border-gray-300 w-full">
								<input
									type="text"
									name=""
									id=""
									placeholder="Search here..."
									className="focus:outline-none w-full"
									value={searchTerm}
									onChange={handleSearchChange}
								/>
							</div>
						</div>
					</div>
				</div>
				<div
					className="flex flex-row w-full items-center justify-between"
					ref={filterMenuRef}
					onScroll={handleScroll}>
					<div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm max-h-[100px] overflow-auto">
					{districtNames.map((brand,index) => (
							<>
							{brand.toLowerCase().includes(searchTerm.toLowerCase())?<div
								key={index}
								className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
								<input
									className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
									type="radio"
									name="brand"
									value={brand}
									checked={districtSelected === brand}
									onChange={(e) => handleFilterClick(e.target.value)}
								/>
								<span>{brand}</span>
							</div>:null}

							</>
						))}
					</div>
					
				</div>
			</div>
		</div>
	);
};

export default DistrictFilter;
