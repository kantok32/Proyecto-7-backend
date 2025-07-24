const express = require('express');
const { uploadImage, processImage } = require('../controllers/upload.controller');
const { protect, authorize } = require('../middlewares/auth');

const router = express.Router();

router.post(
  '/image',
  protect,
  authorize('admin'),
  uploadImage,
  processImage
);

module.exports = router; 