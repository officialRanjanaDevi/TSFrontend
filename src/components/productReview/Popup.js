import React from 'react';

const Popup = ({ message, onConfirm, onCancel }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
			<div className="bg-white p-8 rounded-md shadow-md">
				<p className="text-lg mb-4">{message}</p>
				<div className="flex justify-end">
					<button
						className="px-4 py-2 mr-2 bg-black text-white rounded"
						onClick={onConfirm}>
						Confirm
					</button>
					<button className="px-4 py-2 bg-gray-300 rounded" onClick={onCancel}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
};

export default Popup;
