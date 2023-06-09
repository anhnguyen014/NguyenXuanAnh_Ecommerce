const Promotion = require("../models/promotionModel");
const asyHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createPromotion = asyHandler(async (req, res) => {
  const { promotionId, productId } = req.params;
  try {
    const promotion = await Promotion.findById(promotionId);
    if (!promotion) {
      return res.json({ error: "Khuyen mai khong ton tai!" });
    }
    const product = await Product.findById(productId);
    if (!product) {
      return res.json({ error: "San pham khong ton tai!" });
    }

    const existingProduct = promotion.products.find(
      (productId) => productId.toString() === product._id.toString()
    );
    if (existingProduct) {
      return res.json({ error: "San pham da ton tai trong khuyen mai!" });
    }

    promotion.products.push(product._id);
    await promotion.save();
    return res.json({ message: "Them san pham thanh cong!" });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createPromotion,
};
