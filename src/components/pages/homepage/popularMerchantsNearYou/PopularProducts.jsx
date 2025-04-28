import React from 'react';
import ProductCard from './ProductCard';

const PopularProducts = ({ products, activeTab }) => {
	// Filter products based on activeTab
	const filteredProducts =
		activeTab === 0
			? products
			: products.filter((product) => product.categories.includes(activeTab));

	return (
		<div className="flex flex-col gap-2 my-3">
			<div className=" grid  gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
				{filteredProducts.map((product, key) => (
					<ProductCard key={key} productDetails={product} />
				))}
			</div>
		</div>
	);
};

export default PopularProducts;
