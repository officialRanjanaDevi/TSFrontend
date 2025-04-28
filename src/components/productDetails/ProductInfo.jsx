import React from 'react';

export default function Info({ productData }) {
	//  console.log(productData);
	return (
		<div className="px-4 lg:px-[120px] w-full flex flex-col mx-auto ">
			<div className="flex flex-col items-start w-full gap-6 py-4 lg:py-8">
				<div className="w-full">
					<h1 className="text-xl font-semibold lg:text-3xl">
						{productData.productName}
					</h1>
					<div className="w-full h-px bg-gradient-to-r from-gray-700 via-transparent to-white"></div>
				</div>
				<p className="text-base font-normal text-justify">
					{productData.shortDescription}
				</p>
				<p className="text-base font-normal text-justify">
					{productData.fullDescription}
				
				</p>
			</div>

			{productData.features.length > 0 && (
				<div className="flex flex-col items-start w-full gap-6 py-4 lg:py-8">
					<div className="w-full">
						<h1 className="text-base font-semibold lg:text-xl">Features</h1>
						<div className="w-full h-px bg-gradient-to-r from-gray-700 via-transparent to-white"></div>
					</div>
					<ul className="w-full text-base font-normal text-justify list-disc list-inside">
						{productData.features.map((feature) => (
							<li key={feature}>{feature}</li>
						))}

					</ul>
				</div>
			)}

			{productData.specifications && (
				<div className="flex flex-col items-start w-full gap-6 py-4 lg:py-8">
					<div className="w-full">
						<h1 className="text-base font-semibold lg:text-xl">
							Specifications
						</h1>
						<div className="w-full h-px bg-gradient-to-r from-gray-700 via-transparent to-white"></div>
					</div>
					<div className="flex flex-col items-start justify-between gap-2.5 w-full text-sm">
						{productData?.specifications.map((specification, index) => (
							<div
								key={index}
								className="flex flex-col gap-2.5 w-full  md:w-1/3">
								<div className="flex items-center justify-between">
									<div className='capitalize'>{specification && specification.title}</div>
									<div>{specification && specification.value}</div>
								</div>
								<div className="w-full h-[1px] bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
							</div>
						))}
					</div>
				</div>
			)}

			
		</div>
	);
}
