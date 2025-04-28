import axios from 'axios';

const fetchData = async (id) => {
	try {
		const response = await axios.post(
			'https://trialshopy-backend.onrender.com/api/v1/categories',
			{
				filters: { parent: id },
			}
		);
		return response.data;
	} catch (error) {
		console.error('Error fetching categories:', error);
		return [];
	}
};

export default fetchData;
