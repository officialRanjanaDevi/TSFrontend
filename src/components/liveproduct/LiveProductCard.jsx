
import axios from 'axios';
import Link from 'next/link'; // Keep only one import for Link
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function LiveProductCard({ setIsCart }) {
	const [loading, setLoading] = useState(true);
	const [products, setProducts] = useState([]);
	const router = useRouter();
	const [changeImage, setChangeImage] = useState(false);
	const [favourite, setFavourite] = useState(false);
	const productId = router.query.productId;
	const serverURL = process.env.NEXT_PUBLIC_BASE_API_URL;

	const handleFavouriteClick = (productId) => {
		
		const updatedProducts = products.map((product) => {
			if (product._id === productId) {
			
				return { ...product, favourite: !product.favourite };
			}
			return product;
		});

		setProducts(updatedProducts);
// Display an alert when wishlist button is clicked
		const message = updatedProducts.find((product) => product._id === productId)
			.favourite
			? 'Product added to wishlist'
			: 'Product removed from wishlist';

		window.alert(message);

		
	};

	const handleRemoveProduct = (productId) => {
		const storedProductsString = localStorage.getItem('liveViewProducts');
		const storedProductsArray = storedProductsString
			? JSON.parse(storedProductsString)
			: [];

		const updatedProductsArray = storedProductsArray.filter(
			(product) => product._id !== productId
		);

		localStorage.setItem(
			'liveViewProducts',
			JSON.stringify(updatedProductsArray)
		);

		setProducts(updatedProductsArray);
	};

	useEffect(() => {
		const fetchProductData = async () => {
			setLoading(true);
			const apiUrl = `${serverURL}/api/v1/
			/${productId}`;
			try {
				const storedProductsString = localStorage.getItem('liveViewProducts');
				const storedProductsArray = storedProductsString
					? JSON.parse(storedProductsString)
					: [];

				const response = storedProductsArray.length
					? { data: storedProductsArray }
					: await axios.get(apiUrl);

				const productsArray = Array.isArray(response.data)
					? response.data
					: [response.data];

				setProducts(productsArray);
			} catch (err) {
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchProductData();
	}, [productId, serverURL]);

	// Function to filter products by storeName
	const filterProductsByStore = (storeName) => {
		return products.filter(
			(product) => product.storeId.storeName === storeName
		);
	};

	const uniqueStoreNames = [
		...new Set(products.map((product) => product.storeId.storeName)),
	];

	return (
		<>
			<div className="px-4 lg:w-[40vw] md:w-[60vw] w-[85vw] overflow-auto h-full absolute">
				{loading ? (
					<p>Loading...</p>
				) : (
					<div className="">
						{uniqueStoreNames.map((storeName) => (
							<div key={storeName}>
								<div className="flex py-2 font-poppins">
									<div className="text-[#000000] mr-auto text-[14px] 2xl:text-[24px] xl:text-[20px] lg:text-[14px] md:text-[14px] font-semibold items-center flex">
										<h1>{storeName}</h1>
									</div>
									<button className="bg-[#EB8105] text-black w-32 h-[40px] py-2 border-0 border-b-5 border-r-6 transition duration-300 ease-out">
    <Link
        href={`/liveproduct1?storeName=${encodeURIComponent(storeName)}`}
        onClick={() => {
            setIsCart(false);
        }}
    >
        Go Live
    </Link>
</button>

								</div>

								<div className="flex h-auto gap-3 my-2 mb-2 overflow-auto grid-container">
									<div className="flex gap-3">
										{filterProductsByStore(storeName).map((product) => (
											<div key={product._id} className="w-[120px] h-auto">
												{product.images.map((image,index) => (
													<div key={index}  className="relative">
														<Link
															href={`/products/details?productId=${product._id}`}>
															{/* <img
																key={image._id}
																src={image.url}
																alt={product.productName}
																className="w-full h-[129.2px] object-cover"

															/> */}
															<Image
																width={500}
																height={500}
																key={image._id}
																src={image.url}
																alt={product.productName}
																className="w-full h-[129.2px] object-cover"

															/>
														</Link>
														<div className="absolute text-black py-0.5   px-1 lg:px-1 bg-white bg-opacity-80 rounded-[16px] left-2 bottom-1">
															<h2 className="flex flex-row items-center gap-1 font-semibold lg:text-sm">
																<span className="text-[10px]  ">
																	{product.rating.rating}
																</span>
																<span className="">
																	<Image
																		alt="heart"
																		width={25}
																		height={25}
																		className="w-2 h-2 lg:w-2 lg:h-2 "
																		src={'/images/Vector2.svg'}
																	/>
																</span>
																<span className="pl-1 border-l text-[10px] border-gray-400">
																	{product.rating.count}
																</span>
															</h2>
														</div>

														<div className="absolute text-black right-2 top-1 lg:top-2 ">
															<h2 className="">
																<button
																	onClick={() =>
																		handleFavouriteClick(product._id)
																	}>
																	<Image
																		width={25}
																		height={25}
																		alt="wishlist"
																		className="w-5 h-5 cursor-pointer"
																		src={
																			!product.favourite
																				? '/images/Vector3.svg'
																				: '/images/heart.svg'
																		}
																	/>
																</button>
															</h2>
														</div>

														<div className="absolute text-black md:left-1 left-1 mr-[80%] top-2 md:top-1">
															
															<Image
																width={20}
																height={20}
																alt="crossbtn"
																className="md:mx-0 block  lg:pt-1 lg:mt-0.5  xl:h-[2vh] md:h-[1.5vh] h-[1.5vh] md:h-full]"
																src="/images/cross.svg"
																// onClick={() => handleRemoveProduct(product._id)}
															/>
														</div>
													</div>
												))}
												<span className="text-[#18181B] font-poppins text-[9px] leading-[13.79px] font-semibold mb-0">
													{product.productName}
												</span>
												<div className="font-poppins text-[7px] leading-[13.79px] text-left">
													<span className="text-[#7C7C7C] ">
														{product.shortDescription}
													</span>
												</div>
												<div className="font-poppins text-[7px] leading-11 text-left">
													<span className="text-[#7C7C7C]">
														<span className="font-normal text-[8px] leading-9.66">
															{product.price -
																(product.price * product.discount) / 100}
														</span>
														<span className="line-through ml-1 font-normal text-[9px] leading-9.66">
															{product.price}
														</span>
														<span className="ml-1 text-[#FF6060] font-semibold text-[9px] leading-9.66">
															({product.discount}% off)
														</span>
													</span>
												</div>
											</div>
										))}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
}

