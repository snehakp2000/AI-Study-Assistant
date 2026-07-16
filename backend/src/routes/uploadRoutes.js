const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");
const { uploadPdf } = require("../controllers/uploadController");

router.post(
    "/uploadpdf",
    authMiddleware,
    upload.single("pdf"),
    uploadPdf
);

module.exports = router;