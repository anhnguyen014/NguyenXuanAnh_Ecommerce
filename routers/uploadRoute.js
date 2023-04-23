const express = require("express");
const { updateImages, deleteImages } = require("../controllers/uploadCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");
const {
  uploadPhoto,
  productImgResize,
} = require("../middlewares/uploadImages.js");

const router = express.Router();

router.post(
  "/",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 12),
  productImgResize,
  updateImages
);

router.delete("/delete-image/:id", authMiddleware, isAdmin, deleteImages);

module.exports = router;
