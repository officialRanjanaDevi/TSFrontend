import axios from "axios";

export const addItemToCart = async ({ productId, count, size, customerId, serverURL }) => {
  try {
    const response = await axios.post(`${serverURL}/api/v1/cart/addItem`, {
      productId,
      count,
      size,
      customerId,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding item to cart", error);
    throw error;
  }
};

export const fetchCart = async (userId, serverURL) => {
  try {
    const response = await axios.get(`${serverURL}/api/v1/cart/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching cart", error);
    throw error;
  }
};
