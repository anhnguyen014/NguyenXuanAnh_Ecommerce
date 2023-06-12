const Promotion = require("../models/promotionModel");
const asyHandler = require("express-async-handler");
const Product = require("../models/productModel");

const createPromotion = asyHandler(async (req, res) => {
  try {
    const newPromotion = await Promotion.create(req.body);
    res.json({ success: true, newPromotion });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllPromotion = asyHandler(async (req, res) => {
  try {
    const promotions = await Promotion.find().populate("productID");
    res.json(promotions);
  } catch (error) {
    throw new Error(error);
  }
});

const getProductSale = asyHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const findSale = await Promotion.findById(id).populate("productID");
    res.json(findSale);
  } catch (error) {
    throw new Error(error);
  }
});

const removeProductSale = asyHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const removeSale = await Promotion.findByIdAndDelete(id);
    res.json(removeSale);
  } catch (error) {
    throw new Error(error);
  }
});

const updatedProductSale = asyHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const updateProduct = await Promotion.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      success: true,
      updateProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  getAllPromotion,
  createPromotion,
  getProductSale,
  removeProductSale,
  updatedProductSale,
};
