// User model - defines user structure with authentication
const mongoose = require('mongoose');

//-------------------3/16/2026--------updated--------------------------
// User schema definition
const userSchema = new mongoose.Schema({
    // User email (unique, required)
    email: {type: String,
            unique: true, 
            required: true,
    },
    
    // User password (required)
    password: {
        type: String, 
        required: true, 
              
    },
    
    // User full name
    name: {
        type: String,
        required: true,
        unique:true,
          
    },
    
    // User role (default: 'user', can be 'admin' for admin access)
    role: {
        type: String, 
        default: 'user'
    },
},{ timestamps: true});  // Automatically add createdAt and updatedAt



const User = mongoose.model("User", userSchema);

module.exports = User; // export default User;


//-------------------------------------------------------------------------------------
// // Hash password before saving to database
// userSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) return next();  // Only hash if password is new/changed
//     this.password = await bcrypt.hash(this.password, 10);  // Hash with salt rounds of 10
//     next();
// });

// // Method to compare login password with hashed password
// userSchema.methods.comparePassword = async function(candidatePassword) {
//     return await bcrypt.compare(candidatePassword, this.password);
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;
