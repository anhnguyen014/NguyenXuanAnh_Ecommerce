const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategory,
  getAllCategory,
  deleteCategory,
  updateImages,
} = require("../controllers/categoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const {
  uploadPhoto,
  categoryImgResize,
} = require("../middlewares/uploadImages");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.put(
  "/upload/:id",
  authMiddleware,
  isAdmin,
  uploadPhoto.array("images", 5),
  categoryImgResize,
  updateImages
);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);

module.exports = router;
