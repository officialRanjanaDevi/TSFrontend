import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
	const pageLimit = 9;
	const pageArray = Array.from({ length: totalPages }, (_, i) => i + 1);

	let visiblePages = pageArray;
	if (totalPages > pageLimit) {
		const startPage = Math.max(currentPage - Math.floor(pageLimit / 2), 1);
		const endPage = Math.min(startPage + pageLimit - 1, totalPages);

		visiblePages = [...Array(pageLimit)].map((_, index) => startPage + index);

		if (endPage < totalPages) {
			visiblePages[pageLimit - 2] = '.....';
			visiblePages[pageLimit - 1] = totalPages;
		}
	}

	return (
		<div className="flex items-center justify-center my-4 lg:my-6">
			<button
				className="p-3 mr-2"
				disabled={currentPage === 1}
				onClick={() => onPageChange(currentPage - 1)}>
				&lt;
			</button>
			{visiblePages.map((page, index) => (
				<React.Fragment key={index}>
					{page !== '.....' ? (
						<button
							className={`p-3  ${
								currentPage === page ? 'bg-black text-white' : 'bg-white'
							} rounded-md mx-1`}
							onClick={() => onPageChange(page)}>
							{page}
						</button>
					) : (
						<span className="p-2 mx-1">...</span>
					)}
				</React.Fragment>
			))}
			<button
				className="p-3 ml-2"
				disabled={currentPage === totalPages}
				onClick={() => onPageChange(currentPage + 1)}>
				&gt;
			</button>
		</div>
	);
};

export default Pagination;
