const Coupon = require("../models/couponModel");
const asyncHandle = require("express-async-handler");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");

//Create Coupon

const createCoupon = asyncHandle(async (req, res) => {
  try {
    const newCoupon = await Coupon.create(req.body);
    res.json(newCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//Get All Coupon

const getAllCoupon = asyncHandle(async (req, res) => {
  try {
    const coupon = await Coupon.find();
    res.json(coupon);
  } catch (error) {
    throw new Error(error);
  }
});

//update a coupon

const updateCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const updatedCoupon = await Coupon.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCoupon);
  } catch (error) {
    throw new Error(error);
  }
});

//get a Coupon
const getCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const find = await Coupon.findById(id);
    res.json(find);
  } catch (error) {
    throw new Error(error);
  }
});

//delete a coupon

const deleteCoupon = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const deletedCoupon = await Coupon.findByIdAndDelete(id);
    res.json({ success: true, deletedCoupon });
  } catch (error) {
    throw new Error(error);
  }
});
module.exports = {
  createCoupon,
  getAllCoupon,
  updateCoupon,
  getCoupon,
  deleteCoupon,
};
