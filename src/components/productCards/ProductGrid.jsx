import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ProductGrid({ cards, title, setInitialProduct = 0 }) {
	const [catgProducts, setCatgProducts] = useState([]);

	//Fetching Products accorting to Particular Id
	useEffect(() => {
		const fetchProducts = async () => {
			try {
				const response = await axios.post(
					'https://trialshopy-backend-q24e.onrender.com/api/v1/products/',
					{
						filters: {
							categories: [cards],
						},
					}
				);
				console.log("product",response.data.data);
				setCatgProducts(response.data.data);
				// catgProducts.length > 0 && setInitialProduct(true);
			} catch (error) {
				console.error('Error fetching categories:', error);
			}
		};

		fetchProducts();
	}, [cards]);

	return (
		<>
			<div className="flex flex-col gap-2 my-3">
				{catgProducts.length > 0 && (
					<>
						<div className="flex items-center justify-between">
							<div className="text-2xl font-semibold lg:block">{title}</div>
							<div className="text-xl font-medium lg:block">
								<Link href={`/subcategory/${cards}`} target="_blank">
									{'See all'}
								</Link>
							</div>
						</div>

						<div className="flex flex-row  items-center w-full gap-8 overflow-x-auto grid-container">
							{catgProducts.map((item, index) => (
								<ProductCard productDetails={item} key={index} />
							))}
						</div>
					</>
				)}
			</div>
		</>
	);
}
