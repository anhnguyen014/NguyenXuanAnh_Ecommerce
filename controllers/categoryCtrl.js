const PCategory = require("../models/categoryModel");
const asyHandler = require("express-async-handler");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");

//create PCategory
const createCategory = asyHandler(async (req, res) => {
  try {
    const newCategory = await PCategory.create(req.body);
    res.json(newCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//update Category
const updateCategory = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const updatedCategory = await PCategory.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get a category

const getCategory = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findCategory = await PCategory.findById(id);

    res.json(findCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get all Category
const getAllCategory = asyHandler(async (req, res) => {
  try {
    const getAll = await PCategory.find();
    res.json(getAll);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a category
const deleteCategory = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findCategory = await PCategory.findByIdAndDelete(id);
    res.json({
      success: true,
      findCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  getCategory,
  getAllCategory,
  deleteCategory,
};
