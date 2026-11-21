const multer = require("multer");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

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

const galleryUploadsDir = path.join(__dirname, "..", "uploads", "gallery");
fs.mkdirSync(galleryUploadsDir, { recursive: true });

const allowedGalleryExtensions = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif"]);
const allowedGalleryMimeTypes = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/avif",
]);

const galleryStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, galleryUploadsDir);
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    cb(null, `${crypto.randomBytes(16).toString("hex")}${extension}`);
  },
});

const uploadGallery = multer({
  storage: galleryStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const extension = path.extname(file.originalname).toLowerCase();
    if (!allowedGalleryExtensions.has(extension) || !allowedGalleryMimeTypes.has(file.mimetype)) {
      const error = new Error("Upload a JPG, PNG, WEBP, GIF, or AVIF image");
      error.code = "INVALID_IMAGE_TYPE";
      return cb(error);
    }
    cb(null, true);
  },
});

module.exports = {
  upload,
  uploadBlog,
  uploadGallery,
};
