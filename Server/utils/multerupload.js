const multer = require("multer");
const fs = require("fs");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const imageFileName = Date.now() + "-" + file.originalname;
    cb(null, imageFileName);
  },
});
const upload = multer({ storage: storage });

// Ensure blog uploads directory exists
const blogUploadsDir = path.join(__dirname, "..", "uploads", "blog");
if (!fs.existsSync(blogUploadsDir)) {
  fs.mkdirSync(blogUploadsDir, { recursive: true });
}

// Multer config for Blogs
const blogStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/blog/");
  },
  filename: (req, file, cb) => {
    const imageFileName = Date.now() + "-" + file.originalname;
    cb(null, imageFileName);
  },
});
const uploadBlog = multer({ storage: blogStorage });

module.exports = {
  upload,
  uploadBlog
};
