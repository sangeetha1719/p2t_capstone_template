// Products grid component - displays product cards in a responsive grid
// Each card shows product details and an "Add to Cart" button

import React from 'react';
import { useCartStore } from '../store/CartStore';

const Products = ({ products = [] }) => {
  // Access addItem function from cart store
  const { addItem } = useCartStore();

  return (
    // Product grid
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
      {products?.map((product) => (
        <div key={product._id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-lg transition-shadow">
          {/* Product image */}
          <img src={product.imageUrl || product.images?.[0]?.url} alt={product.name} className="w-full h-48 object-cover" />
          <div className="p-4">
            {/* Product details */}
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-600 text-sm mb-2">{product.category}</p>
            <p className="text-xl font-bold text-blue-600 mb-2">${product.price}</p>
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{product.description}</p>
            {/* Add to cart button */}
            <button 
              onClick={() => addItem(product)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;


