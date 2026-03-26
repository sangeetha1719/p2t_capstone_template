import axios from 'axios';

const baseUrl = import.meta.env.VITE_API_ENDPOINT;

export async function getOrders() {
    const { data } = await axios.get(`${baseUrl}/orders`);
    return data;
}

export async function deleteProduct(productId) {
    const { data } = await axios.delete(`${baseUrl}/products/${productId}`);
    return data;
}
