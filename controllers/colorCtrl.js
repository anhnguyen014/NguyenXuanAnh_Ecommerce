const Color = require("../models/colorModel");
const asyHandler = require("express-async-handler");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");

//create PColor
const createColor = asyHandler(async (req, res) => {
  try {
    const newColor = await Color.create(req.body);
    res.json(newColor);
  } catch (error) {
    throw new Error(error);
  }
});

//update Color
const updateColor = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const updatedColor = await Color.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedColor);
  } catch (error) {
    throw new Error(error);
  }
});

//get a Color

const getColor = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findColor = await Color.findById(id);

    res.json(findColor);
  } catch (error) {
    throw new Error(error);
  }
});

//get all Color
const getAllColor = asyHandler(async (req, res) => {
  try {
    const getAll = await Color.find();
    res.json(getAll);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a Color
const deleteColor = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findColor = await Color.findByIdAndDelete(id);
    res.json({
      success: true,
      findColor,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createColor,
  updateColor,
  getColor,
  getAllColor,
  deleteColor,
};
