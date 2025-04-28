import React from 'react';
import DealsCard from './DealsCard';

const DealsCardGrid = ({ cards, title }) => {
	return (
		<div className="flex flex-col gap-2 my-5">
			<div className="my-2 w-fit lg:block text-xl font-semibold border-primary border-b-2">
				{title}
			</div>
			<div className="flex flex-row items-center justify-between gap-4 w-full overflow-auto grid-container">
				{cards.map((card, index) => (
					<DealsCard
						key={index}
						image={card.image}
						title={card.title}
						offer={card.title}
					/>
				))}
			</div>
		</div>
	);
};

export default DealsCardGrid;
