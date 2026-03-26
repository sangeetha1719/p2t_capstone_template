// Category filter component - allows users to filter products by category
// Displays category buttons with active state highlighting

import React from 'react';

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  // Available product categories
  const categories = ['All', 'Electronics', 'Clothing', 'Accessories'];

  return (
    <div className="flex flex-wrap justify-center gap-3 my-6  m-auto py-4">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category === 'All' ? null : category)}
          className={`px-6 py-2 rounded-lg transition-colors ${
            selectedCategory === category || (category === 'All' && !selectedCategory)
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
