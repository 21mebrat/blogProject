const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Path to the uploads folder
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9); // Generate unique file name
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Append file extension
  },
});

const uploads = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // Max file size (10MB)
  },
});

module.exports = uploads;  // Ensure this is 'uploads'
