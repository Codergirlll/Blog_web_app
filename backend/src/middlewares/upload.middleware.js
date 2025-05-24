const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const {
  CLOUDINARY_NAME: cloud_name,
  CLOUDINARY_API_KEY: api_key,
  CLOUDINAARY_API_SECRET: api_secret,
} = process.env;

cloudinary.config({ cloud_name, api_key, api_secret });

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "Blog-Images",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
  },
});

const upload = multer({ storage }).single("img");

function multerMiddleware(req, res, next) {
  upload(req, res, function (err) {
    if (err) {
      console.error("Error:", err);
      return res.status(500).json({ error: "File upload failed" });
    }
    next();
  });
}

module.exports = multerMiddleware;

// const multer = require("multer");
// const path = require("path");

// // Configure storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // your upload folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// // File filter to allow only images
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files (jpeg, jpg, png, gif) are allowed"));
//   }
// };

// // Multer upload instance with limits and filters
// const upload = multer({
//   storage,
//   fileFilter,
//   limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max size
// }).single("image");

// // Middleware function
// function uploadMiddleware(req, res, next) {
//   upload(req, res, function (err) {
//     if (err) {
//       console.error("Error:", err);

//       if (err instanceof multer.MulterError) {
//         // Handle multer-specific errors (like file size limit)
//         return res.status(400).json({ error: `Multer error: ${err.message}` });
//       } else if (
//         err.message === "Only image files (jpeg, jpg, png, gif) are allowed"
//       ) {
//         // Custom file filter error
//         return res.status(400).json({ error: err.message });
//       } else {
//         // Other unknown errors
//         return res
//           .status(500)
//           .json({ error: "Unexpected error occurred during file upload" });
//       }
//     }
//     // No errors, continue to next middleware/controller
//     next();
//   });
// }

// module.exports = uploadMiddleware;
