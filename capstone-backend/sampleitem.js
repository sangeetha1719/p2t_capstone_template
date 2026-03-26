// Database  - populates MongoDB with sample product data
require('dotenv').config();
const mongoose = require('mongoose');
const Product = require('./models/Product');

// Sample product data for e-commerce store
const products = [
  {
    name: 'Premium Laptop Pro',
    price: 1299.99,
    description: 'High-performance laptop with 16GB RAM, 512GB SSD, and stunning 15.6" display.',
    imageUrl: 'https://res.cloudinary.com/dfolvdmds/image/upload/v1772763669/cld-sample-2.jpg',
    category: 'Electronics',
  },
  {
    name: 'Wireless Headphones',
    price: 299.99,
    description: 'Premium wireless headphones with active noise cancellation and 30-hour battery.',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
    category: 'Electronics',
  },
  {
    name: 'Smartwatch Ultra',
    price: 449.99,
    description: 'Advanced smartwatch with fitness tracking, GPS, and heart rate monitor.',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500',
    category: 'Accessories',
  },
  {
    name: 'Backpack',
    price: 89.99,
    description: 'Durable backpack with laptop compartment and water-resistant material.',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500',
    category: 'Accessories',
  },
  {
    name: 'Professional Camera',
    price: 1899.99,
    description: 'Complete camera kit with 24MP sensor, 4K video, and multiple lenses.',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500',
    category: 'Electronics',
  },
  {
    name: 'Flagship Smartphone',
    price: 999.99,
    description: '5G smartphone with triple camera system and 6.7" OLED display.',
    imageUrl: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500',
    category: 'Electronics',
  },
  {
    name: 'Bluetooth Speaker',
    price: 299.99,
    description: 'Portable Bluetooth speaker with 360-degree sound and waterproof design.',
    imageUrl: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=500',
    category: 'Electronics',
  },
  {
    name: 'Designer T-Shirt',
    price: 49.99,
    description: 'Premium cotton t-shirt with modern design and comfortable fit.',
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500',
    category: 'Clothing',
  },
  {
    name: 'Leather Jacket',
    price: 199.99,
    description: 'Genuine leather jacket with classic style and premium quality.',
    imageUrl: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500',
    category: 'Clothing',
  },
  {
    name: 'Running Shoes',
    price: 129.99,
    description: 'Lightweight running shoes with extra cushioning and breathable mesh.',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500',
    category: 'Clothing',
  }
];
// Connect to MongoDB and check  the database
mongoose.connect(process.env.DB_URL)
  .then(async () => {
    console.log('Connected to MongoDB');
  await Product.insertMany(products);
    console.log('Added sample products');
    // Close database connection
    mongoose.connection.close();
  })
  .catch(err => console.error('Error:', err));
