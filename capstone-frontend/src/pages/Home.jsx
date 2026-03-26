// Home page component - displays product catalog with filtering and search
// Manages product fetching, category filtering, search, and pagination

import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/ProductService';
import Products from '../components/Products';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

const Home = () => {
  // State management for products and filters
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const data = await getProducts(selectedCategory, searchTerm);
        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="min-h-screen bg-conic-to-l from-sky-400 to-blue-800">
      <h2 className="text-3xl font-bold text-center my-6">Products</h2>
      <SearchBar onSearch={handleSearch} />
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
      {loading ? (
        <div className="text-center py-20 text-xl">Loading...</div>
      ) : products.length === 0 ? (
        <div className="text-center py-20 text-xl text-gray-600">No products found</div>
      ) : (
        <Products products={products} />
      )}
    </main>
  );
};

export default Home;

