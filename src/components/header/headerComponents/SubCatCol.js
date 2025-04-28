import Link from 'next/link';
import { useEffect, useState } from 'react';
const SubCatCol = ({ category, setIsDroOpen }) => {
	const subCats = category.children;
	
	
	
	return (
		<div className="flex flex-col">
			<div className="font-medium">{category.name}</div>
			{subCats &&
				subCats.length > 0 &&
				subCats.map((subcategory) => (
					<Link
						key={subcategory._id}
						href={`/subcategory/${subcategory._id}`}
						className="my-1 text-gray-600 cursor-pointer"
						onClick={()=>{
							
							setIsDroOpen(false);
						}}>
						{subcategory.name}
					</Link>
				))}
		</div>
	);
};

export default SubCatCol;
