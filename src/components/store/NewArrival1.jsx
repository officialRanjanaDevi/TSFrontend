import { useState, useEffect } from 'react';
// import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

export default function NewArrival1() {
	const [userLocation, setUserLocation] = useState(null);
	const router = useRouter();
	const Column = ({ imageName, text, route }) => (
		<>
			<div
				className="flex flex-col items-center rounded cursor-pointer hover:shadow-lg hover:font-semibold hover:scale-105"
				onClick={() => handleRequestLocationAccess(route)}>
				<div className="overflow-hidden w-28 h-28 shrink-0 md:w-24 lg:w-48 md:h-24 lg:h-44 lg:rounded-sm">
					<Image
						className="object-cover w-full h-full"
						src={`/images/${imageName}`}
						width={300}
						height={300}
						alt=""
					/>
				</div>
			
			</div>
		</>
	);

	useEffect(() => {
		const storedLocation = localStorage.getItem('userLocation');
		if (storedLocation) {
			setUserLocation(JSON.parse(storedLocation));
		}
	}, []);

	const handleRequestLocationAccess = (route) => {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(function (position) {
				const { latitude, longitude } = position.coords;

				localStorage.setItem(
					'userLocation',
					JSON.stringify({ latitude, longitude })
				);

				console.log(latitude, longitude);
				setUserLocation({ latitude, longitude });

				router.push(route);
			});
		} else {
			// Geolocation not available
		}
	};
	return (
		<>
			<div className="flex flex-row justify-start w-full gap-2 mt-4 mb-2 overflow-auto grid-container">
				<div className="">
					{/* <Link href="/nearByStore/fashion"> */}
					<Column
						imageName="arrival2.svg"
						text="Nearby Fashion"
						route="/nearByStore/fashion"
					/>
					{/* </Link> */}
				</div>
				<div className="">
					{/* <Link href="/nearByStore/jewellery"> */}
					<Column
						imageName="arrival3.svg"
						text="Nearby Jewellery"
						route="/nearByStore/jewellery"
					/>
					{/* </Link> */}
				</div>
				<div className="">
					<Column
						imageName="arrival4.svg"
						text="Nearby Beauty & Cosmetics"
						route="/nearByStore/beauty"
					/>
				</div>

			</div>
		</>
	);
}
