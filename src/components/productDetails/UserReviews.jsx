import React from 'react';
import Image from 'next/image';
export default function UserReviews({ reviews }) {
	return (
		<div className="px-4 lg:pl-[120px] flex flex-col gap-6 w-full py-4 lg:py-8 ">
			<div className="w-full">
				<h1 className="text-base lg:text-xl font-semibold">Reviews</h1>
				<div className="w-full h-[1px] bg-gradient-to-r from-gray-700 via-transparent to-white"></div>
			</div>
			{reviews && reviews.length > 0 ? (
				<div className="flex flex-row items-center justify-between text-white gap-[30px] w-full overflow-auto lg:overflow-hidden lg:hover:overflow-x-auto">
					{reviews.map((review) => {
						<div className="border bg-gray-800 shrink-0 p-4 w-[184px] lg:w-[360px]">
							<div className="flex flex-col items-start  gap-2.5 w-full">
								<div className="flex items-center justify-start gap-2 p-1 w-full">
									<Image
										width={20}
										height={20}
										src="/images/man.png"
										alt=""
										className="w-6 h-full"
									/>
									<h4 className="font-sans font-semibold">{review.userName}</h4>
								</div>

								<div className="flex flex-row items-center justify-start gap-2 w-full ">
									<div className="shrink-0 w-3 h-3 lg:w-5 lg:h-5">
										<Image
											src={'/icons/staricon.svg'}
											width={24}
											height={24}
											alt="star"
										/>
									</div>
									<div className="shrink-0 w-3 h-3 lg:w-5 lg:h-5">
										<Image
											src={'/icons/staricon.svg'}
											width={24}
											height={24}
											alt="star"
										/>
									</div>
									<div className="shrink-0 w-3 h-3 lg:w-5 lg:h-5">
										<Image
											src={'/icons/staricon.svg'}
											width={24}
											height={24}
											alt="star"
										/>
									</div>
									<div className="shrink-0 w-3 h-3 lg:w-5 lg:h-5">
										<Image
											src={'/icons/staricon.svg'}
											width={24}
											height={24}
											alt="star"
										/>
									</div>
									<div className="shrink-0 w-3 h-3 lg:w-5 lg:h-5">
										<Image
											src={'/icons/staricon.svg'}
											width={24}
											height={24}
											alt="star"
										/>
									</div>
								</div>

								<p className="text-xs  text-white ">{review.review}</p>
							</div>
						</div>;
					})}
				</div>
			) : (
				<p>No Reviews yet!</p>
			)}
		</div>
	);
}
