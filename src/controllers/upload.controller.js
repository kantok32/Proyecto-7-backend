const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new Error('No es una imagen! Por favor sube solo imágenes.'), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = upload.single('image');

exports.processImage = async (req, res, next) => {
  if (!req.file) return next();

  const filename = `product-${Date.now()}.jpeg`;
  const fullPath = path.join(__dirname, `../../public/uploads/${filename}`);

  await sharp(req.file.buffer)
    .resize(800, 800)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(fullPath);

  req.body.imageUrl = `${req.protocol}://${req.get('host')}/public/uploads/${filename}`;
  
  res.status(201).json({
    success: true,
    imageUrl: req.body.imageUrl,
  });
}; 