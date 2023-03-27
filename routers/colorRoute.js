const express = require("express");
const {
  createColor,
  updateColor,
  getColor,
  getAllColor,
  deleteColor,
} = require("../controllers/colorCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const router = express.Router();

router.post("/", authMiddleware, isAdmin, createColor);
router.put("/:id", authMiddleware, isAdmin, updateColor);
router.delete("/:id", authMiddleware, isAdmin, deleteColor);
router.get("/:id", getColor);
router.get("/", getAllColor);

module.exports = router;
