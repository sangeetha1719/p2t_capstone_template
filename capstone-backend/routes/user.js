// User routes - handles authentication endpoints
const express = require('express');
const { registerUser, loginUser } = require('../controllers/user');

const router = express.Router();

// POST /users/register - Register new user
router.post('/signup', registerUser);

// POST /users/login - Login user
router.post('/login', loginUser);




module.exports = router;
