const express = require("express");
const {
  createCategory,
  updateCategory,
  getCategory,
  getAllCategory,
  deleteCategory,
} = require("../controllers/categoryCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCategory);
router.put("/:id", authMiddleware, isAdmin, updateCategory);
router.delete("/:id", authMiddleware, isAdmin, deleteCategory);
router.get("/:id", getCategory);
router.get("/", getAllCategory);

module.exports = router;
