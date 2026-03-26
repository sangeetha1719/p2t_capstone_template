// Upload routes - handles image upload endpoints
const express = require('express');
const router = express.Router();
const upload = require('../configuration/multer');
const uploadController = require('../controllers/upload');

// POST /upload - Upload single image
router.post('/', upload.single('image'), uploadController.uploadImage);

module.exports = router;
