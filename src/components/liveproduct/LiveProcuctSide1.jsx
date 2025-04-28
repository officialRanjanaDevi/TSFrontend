import React from 'react'
import Image from 'next/image';

function LiveProcuctSide1() {
  return (
		<div>
			<div className="flex flex-col items-center gap-3 ml-2 border lg:mr-9">
				<div className="grid grid-cols-3 gap-3 px-1 2xl:grid-cols-2 xl:grid-cols-2 lg:grid-cols-2 md:flex-row">
					<Image
						width={500}
						height={500}
						src="/images/girl.jpeg"
						alt=""
						className="w-40 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36 md:w-56"
					/>
					<Image
						width={500}
						height={500}
						src="/images/live1.png"
						alt=""
						className="w-40 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36 md:w-56"
					/>
					<Image
						width={500}
						height={500}
						src="/images/live2.png"
						alt=""
						className="w-40 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36 md:w-56"
					/>
					<Image
						width={500}
						height={500}
						src="/images/live3.png"
						alt=""
						className="w-40 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36 md:w-56"
					/>
					<Image
						width={500}
						height={500}
						src="/images/live2.png"
						alt=""
						className="w-40 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36 md:w-56"
					/>
					<Image
						width={500}
						height={500}
						src="/images/live3.png"
						alt=""
						className="w-40 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36 md:w-56"
					/>
				</div>

				{/* <div className="flex flex-col gap-3 md:flex-row">
					<Image
						width={500}
						height={500}
						src="/images/live2.png"
						alt=""
						className="w-48 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36"
					/>
					<Image
						width={500}
						height={500}
						src="/images/live3.png"
						alt=""
						className="w-48 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36"
					/>
				</div>

				<div className="flex flex-col gap-3 md:flex-row">
					<Image
						width={500}
						height={500}
						src="/images/live2.png"
						alt=""
						className="w-48 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36"
					/>
					<Image
						width={500}
						height={500}
						src="/images/live3.png"
						alt=""
						className="w-48 h-48 mt-2 2xl:w-48 xl:w-40 lg:w-36"
					/>
				</div> */}
				<div className="grid w-full grid-cols-2 gap-2 mt-3 ">
					{/* <Image
						width={500}
						height={500} src="/images/e.jpeg" alt="" className="w-48 " />
					<Image
						width={500}
						height={500} src="/images/g.jpeg" alt="" className="w-48 " /> */}
					<button className="  h-12 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border">
						Schedule Live
					</button>
					<button className=" h-12 bg-gradient-to-t from-[#FAAC06] to-[#EB8105] border">
						See All
					</button>
				</div>
			</div>
		</div>
	);
}

export default LiveProcuctSide1
