const img_fashion = '/images/img_fashion.jpeg';

export function getProducts() {
	return [
		{
			id: 1,
			name: 'Product 1 ',
			description: 'Sample Description of Product 1 ',
			rating: 4.5,
			image: img_fashion,
			numberOfRatings: 107,
			price: 329.99,
		},
		{
			id: 2,
			name: 'Product 2 ',
			description: 'Sample Description of Product 2 ',
			rating: 3.8,
			image: img_fashion,
			numberOfRatings: 75,
			price: 119.99,
		},
		{
			id: 3,
			name: 'Product 3 ',
			description: 'Sample Description of Product 3 ',
			rating: 4.2,
			image: img_fashion,
			numberOfRatings: 238,
			price: 939.99,
		},
		{
			id: 3,
			name: 'Product 4 ',
			description: 'Sample Description of Product 4',
			rating: 4.2,
			image: img_fashion,
			numberOfRatings: 238,
			price: 939.99,
		},
	];
}
