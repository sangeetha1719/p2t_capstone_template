// User controller - handles user registration and login
const User = require('../models/User');

// Register new user
const registerUser = async (req, res) => {
    try {
        const { email, username, password, role } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email',
            });
        }

        // Create new user (password will be automatically)
        const user = await User.create({
            name:username,
            email,
            password,
            role: role || 'user',
        });

        // Return user data matching frontend expectations
        res.status(201).json({
            email: user.email,
            username: user.name,
            role: user.role,
            login: true,
        })
    } catch (error) {
        // Handle validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        // Handle duplicate email error
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: 'User already exists with this email'
            });
        }

        // Handle other errors
        res.status(500).json({
            success: false,
            message: 'Server Error'
        });
    }
};

// Login existing user
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password',
            });
        }

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Plain text password comparison (bcrypt is not enabled)
        if (user.password !== password) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Return success with user data
        res.status(200).json({
            email: user.email,
            username: user.name,
            role: user.role,
            login: true,
        });
      
    } catch ( error ) {
        res.status(500).json({
            success: false,
            message: 'Server Error',
        })
    }
};



module.exports = { registerUser, loginUser };
// login new code 

// const loginUser = async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         if (!email || !password) {
//             return res.status(400).json({ success: false, message: 'Please provide email and password' });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }

//         // Plain text password comparison (no bcrypt)
//         if (user.password !== password) {
//             return res.status(401).json({ success: false, message: 'Invalid credentials' });
//         }

//         // ✅ Added missing success response
//         res.json({
//             success: true,
//             user: {
//                 id: user._id,
//                 name: user.name,
//                 email: user.email,
//                 role: user.role,
//             }
//         });

//     } catch (error) {
//         res.status(500).json({ success: false, message: 'Server Error' });
//     }
// };
//-----------------------------------------------------------------------

// // Product model - defines the structure for products in the database
// const mongoose = require('mongoose');

// // Allowed product categories for reference
// const PRODUCT_CATEGORIES = ['laptop', 'monitors', 'headphone', 'Electronics', 'Clothing', 'Accessories'];

// // Product schema definition
// const productSchema = new mongoose.Schema({
//     // Product name (required, removes extra spaces)
//     name: { type: String, required: true, unique: true, trim: true },

//     // ✅ Removed email field - products do not have emails

//     // Product price (required, must be positive)
//     price: { type: Number, required: true, min: 0 },

//     // Product category (required)
//     category: { type: String, required: true },

//     // Product images array from Cloudinary
//     images: [{
//         url: String,      // Cloudinary image URL
//         altText: String,  // Alt text for accessibility
//     }],

//     // Single image URL (for simple products)
//     imageUrl: { type: String },

//     // Short description (max 160 characters for previews)
//     shortDescription: { type: String, maxlength: 160 },

//     // Full product description
//     description: { type: String },
//     longDescription: { type: String },
// },
// {
//     timestamps: true  // Automatically add createdAt and updatedAt fields
// });

// const Product = mongoose.model('Product', productSchema);

// // ✅ Fixed: correct module.exports syntax (was: module.exports = Product, { PRODUCT_CATEGORIES })
// module.exports = Product;
