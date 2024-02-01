// Multer For Uploading FILES
const express = require("express");
const { error } = require("firebase-functions/logger");

const multer = require("multer");
const { s3Uploadv2, s3Uploadv3 } = require("../services/s3Service");

const router = express.Router();

// Custom Names for uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, "uploads/");
//     },
//     filename: (req, file, cb) => {
//         const fileName = file.originalname.toLowerCase().split(".")[0];
//         cb(null, `${fileName}.${file.mimetype.split("/")[1]}`);
//     },
// });

const storage = multer.memoryStorage(); // Stores the file in memory so we can upload to AWS S3

const fileFilter = (req, file, cb) => {
    // Filter so we only get images
    if (file.mimetype.split("/")[0] === "image") {
        cb(null, true);
    } else {
        cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
    }
};

const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1073741824 },
});

//Single File Upload
router.post("/", upload.single("image"), async (req, res) => {
    try {
        const results = await s3Uploadv2(req.files);
        return res.json({ message: "File Uploaded", results });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

//Multiple File Upload
router.post("/upload-multiple", upload.array("image", 5), async (req, res) => {
    try {
        const results = await s3Uploadv3(req.files);
        // const results = await s3Uploadv2(req.files);
        return res.json({ message: "File Uploaded", results });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

// Multiple Fields Upload
const multiUpload = upload.fields([
    { name: "thumbnail", maxCount: 5 },
    { name: "product_images", maxCount: 5 },
    { name: "video", maxCount: 2 },
]);

router.post("/one-product-upload-multiple", multiUpload, (req, res) => {
    console.log(req.files);
    res.json({ message: "File Uploaded" });
});

// Custom Names for uploads
router.post("/upload-custom-name", upload.array("image", 5), (req, res) => {
    res.json({ message: "File Uploaded" });
});

router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        switch (error.code) {
            case "LIMIT_FILE_SIZE":
                return res.status(500).json({
                    message: "File Size is too large. Max limit is 1GB",
                });
            case "LIMIT_FILE_TYPE":
                return res.status(500).json({
                    message: "File Type is not supported. Must be an image",
                });
            case "LIMIT_UNEXPECTED_FILE":
                return res.status(500).json({
                    message: "Unexpected File. Must be an image",
                });
            default:
                return res.status(500).json({
                    message: "Something went wrong",
                });
        }
    }
});

module.exports = router;
