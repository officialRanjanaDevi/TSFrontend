import React, { useState, useRef, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import Image from 'next/image';

const stateNames = [
	'Mini Tractor',
	'DigiTrac',
	'Tractors',
	'Escorts',
	'FarmTrac',
];

const StateFilter = ({ setSelectedFilters }) => {
	const [filterMenuOpen, setFilterMenuOpen] = useState(true);
	const [searchTerm, setSearchTerm] = useState('');
	const [stateSelected, setStateSelected] = useState('');
	const filterMenuRef = useRef(null);
	const scrollbarThumbRef = useRef(null);
	const [isDragging, setIsDragging] = useState(false);

	const handleSearchChange = (e) => {
		setSearchTerm(e.target.value);
		stateNames.filter((brand) => {
			if (brand.toLowerCase().includes(e.target.value.toLowerCase())) {
				handleFilterClick(brand);
			}
		});		
	};

	const handleFilterMenuOpen = () => {
		setFilterMenuOpen(!filterMenuOpen);
	};

	const handleFilterClick = (state) => {
		setStateSelected(state);
		setSelectedFilters({ stateSelected: state });
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
				<h4 className="font-bold">State</h4>
				<Image
					className={`${
						!filterMenuOpen ? 'transform rotate-90 ' : ''
					} duration-200`}
					onClick={handleFilterMenuOpen}
					src="/images/keyboard_arrow_down.svg"
					width={20}
					height={20}
					alt="keyboard_arrow_down"
				/>
			</div>
			<div
				className={`flex flex-col items-start justify-start w-full gap-2  overflow-hidden ${
					filterMenuOpen ? '' : 'hidden'
				} `}>
				<div className="flex flex-col items-start shadow-sm w-full bg-white">
					<div className="flex flex-col justify-center items-start px-1 py-1 gap-2.5 w-full">
						<div className="flex flex-row justify-center items-center gap-1">
							<FaSearch size={14} />
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
					<div className="flex flex-col items-start gap-1.5 w-full text-md lg:text-sm ">
						{stateNames.map((brand,index) => (
							<>
							{brand.toLowerCase().includes(searchTerm.toLowerCase())?<div
								key={index}
								className="flex flex-row items-center gap-2.5 w-full cursor-pointer">
								<input
									className="h-4 w-4 appearance-none bg-[#B3B3B3] checked:bg-gray-700 rounded-full focus:outline-none accent-gray-700"
									type="radio"
									name="brand"
									value={brand}
									checked={stateSelected === brand}
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

export default StateFilter;
