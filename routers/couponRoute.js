const express = require("express");

const {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
} = require("../controllers/couponCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createCoupon);
router.put("/:id", authMiddleware, isAdmin, updateCoupon);
router.delete("/:id", authMiddleware, isAdmin, deleteCoupon);
router.get("/:id", getCoupon);
router.get("/", getAllCoupon);

module.exports = router;
