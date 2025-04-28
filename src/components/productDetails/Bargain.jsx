import { FaLink } from 'react-icons/fa';
import { MdOutlineMic } from 'react-icons/md';
import {
	AiOutlineClose,
	AiFillCloseCircle,
	AiOutlineSend,
} from 'react-icons/ai';

function Bargain({ bargain, setBargain }) {
	return (
		<div className="fixed z-50 bottom-0 right-2 bg-white shadow-lg  w-[90vw] md:w-[30vw] h-[60vh] md:h-[70vh] flex-col justify-start items-start rounded-md overflow-hidden">
			<div className="bg-primary  flex flex-row justify-between items-center p-3">
				<div className="text-white font-medium text-lg">Bargain</div>
				<div
					className="hover:cursor-pointer w-6 h-6"
					onClick={() => setBargain(!bargain)}>
					<AiOutlineClose className="text-white font-semibold text-lg" />
				</div>
			</div>
			<div className="relative top-0 h-fit self-stretch p-2.5 flex-col justify-start items-start gap-[15px] flex">
				<div className="h-[82px] p-[5px] bg-white rounded-xl shadow flex-col justify-center items-end gap-[5px] flex">
					<div className="self-stretch">
						<span className="text-zinc-900 text-[16px] font-semibold leading-normal">
							Product Name <br />
						</span>
						<span className="text-zinc-900 text-[16px] font-normal leading-normal">
							Store Name
							<br />₹ 159
						</span>
					</div>
				</div>
				<div className="w-full self-stretch h-[58px] flex-col justify-center items-end gap-2.5 flex">
					<div className="h-[58px] p-[5px] bg-white rounded-xl shadow flex-col justify-center items-end gap-[5px] flex">
						<div className="self-stretch text-right">
							<span className="text-zinc-900 text-[16px] font-semibold leading-normal">
								Your Offer
							</span>
							<span className="text-zinc-900 text-[16px] font-normal leading-normal">
								₹ 159
							</span>
						</div>
					</div>
				</div>
				<div className="w-full p-2 text-white bg-red-600 rounded-md flex flex-row justify-center items-center gap-2.5 ">
					<AiFillCloseCircle className="text-white" />
					Offer Declined
				</div>
			</div>
			<div className="w-full rounded  flex flex-row shadow-md border border-gray-100 m-1 px-3 sm:px-5 py-2 bg-white justify-start items-center gap-[10px] absolute bottom-0">
				<div className="w-6 h-6 flex">
					<FaLink />
				</div>
				<input
					type="text"
					placeholder="Type your offer..."
					className="w-full h-full p-2"
				/>
				<div className="w-fit p-2 bg-secondary rounded-full shadow justify-start items-start gap-2.5 flex">
					<MdOutlineMic />
				</div>
				<div className="w-6 h-6 px-2 p-1">
					<AiOutlineSend />
				</div>
		</div>
		</div>
	);
}

export default Bargain;
