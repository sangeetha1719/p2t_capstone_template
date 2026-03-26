// // Product service - handles API calls to the backend for product data
// // Uses axios for HTTP requests

// import axios from 'axios';

// // Base URL for backend API
// const baseUrl = 'http://localhost:3500/';

// // Fetch products with optional filtering
// // @param category - Filter by product category (optional)
// // @param searchTerm - Search products by name (optional)
// export async function getProducts(category = null, searchTerm = '') {
//     const params = new URLSearchParams();
//     if (category) params.append('category', category);
//     if (searchTerm) params.append('search', searchTerm);
    
//     const { data } = await axios.get(`${baseUrl}products?${params}`);
//     return data;
// }

// // Fetch a single product by ID
// export async function getProductById(id) {
//     const { data } = await axios.get(`${baseUrl}products/${id}`);
//     return data;
// }


//new code
// src/services/ProductService.js
import axios from 'axios';

export async function getProducts(category = null, searchTerm = '') {
    const params = new URLSearchParams();
    if (category) params.append('category', category);
    if (searchTerm) params.append('search', searchTerm);
    const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/products?${params}`);
    return data;
}

export async function getProductById(id) {
    const { data } = await axios.get(`${import.meta.env.VITE_API_ENDPOINT}/products/${id}`);
    return data;
}