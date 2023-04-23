const express = require("express");
const {
  createBrand,
  updateBrand,
  getBrand,
  getAllBrand,
  deleteBrand,
  updateImages,
} = require("../controllers/brandCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const { uploadPhoto, brandImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createBrand);
router.put("/:id", authMiddleware, isAdmin, updateBrand);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 5),
  brandImgResize,
  updateImages
);
router.delete("/:id", authMiddleware, isAdmin, deleteBrand);
router.get("/:id", getBrand);
router.get("/", getAllBrand);

module.exports = router;
