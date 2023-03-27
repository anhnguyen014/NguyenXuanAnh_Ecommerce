const express = require("express");
const {
  createProduct,
  getAllProduct,
  getProduct,
  updatedProduct,
  deletedProduct,
  addToWishList,
  rating,
} = require("../controllers/productCtrl");
const { isAdmin, authMiddleware } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id", getProduct);
router.put("/wishlist", authMiddleware, addToWishList);
router.put("/rating", authMiddleware, rating);

router.put("/:id", authMiddleware, isAdmin, updatedProduct);
router.delete("/:id", authMiddleware, isAdmin, deletedProduct);

router.get("/", getAllProduct);

module.exports = router;
