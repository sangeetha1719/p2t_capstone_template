// Product model - defines the structure for products in the database

const mongoose = require('mongoose');

// Allowed product categories for validation
 const PRODUCT_CATEGORIES = ['laptop', 'monitors', 'headphone', 'Electronics', 'Clothing', 'Accessories'];

// Product schema definition
const productSchema = new mongoose.Schema({
    // Product name (required, removes extra spaces)
    name: { type: String, required: true,unique: true, trim: true },
    
    // Product price (required, must be positive)
    price: { type: Number, required: true, min: 0 },
    
    // Product category (required, must match allowed categories)
    category: { type: String, required: true },
    
    // Product images from Cloudinary
    images: [{
        url: String,      // Image URL
        altText: String,  // Alt text for accessibility
    }],
    
    // Single image URL (for simple products)
    imageUrl: { type: String },
    
    // Short description (max 160 characters for previews)
    shortDescription: { type: String, maxLength: 160 },
    
    // Full product description
    description: { type: String },
    longDescription: { type: String },
}, 
{
    timestamps: true  // Automatically add createdAt and updatedAt fields
});

const Product = mongoose.model('Product', productSchema);



module.exports = Product, { PRODUCT_CATEGORIES };
