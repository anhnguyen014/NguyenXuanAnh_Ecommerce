const express = require("express");
const { createPromotion } = require("../controllers/promotionCtrl");

const router = express.Router();

router.post("/:id/products/:productId", createPromotion);

module.exports = router;
