const express = require("express");
const {
  createPromotion,
  getProductSale,
  removeProductSale,
  updatedProductSale,
  getAllPromotion,
} = require("../controllers/promotionCtrl");

const router = express.Router();

router.post("/createSale", createPromotion);
router.get("/getSale/:id", getProductSale);
router.get("/", getAllPromotion);

router.delete("/deleteSale/:id", removeProductSale);
router.put("/updateSale/:id", updatedProductSale);

module.exports = router;
