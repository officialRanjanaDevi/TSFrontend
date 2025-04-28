import React from 'react';

const RemoveAddress = ({ address, onDelete, onCancel }) => {
	const handleDelete = () => {
		// Call the onDelete function with the address _id for deletion
		onDelete(address._id);
	};

	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
				<div className="bg-white p-4 rounded shadow-md">
					<div className="font-medium">Confirm</div>
					<div>Are you sure you want to delete this address?</div>
					<div className="mt-4 flex justify-end">
						<button onClick={onCancel} className="text-gray-500 mr-4">
							Cancel
						</button>
						<button
							onClick={handleDelete}
							className="bg-gradient-to-b from-primary to-secondary rounded hover:bg-red-600 text-black px-4 py-1">
							Delete
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RemoveAddress;
