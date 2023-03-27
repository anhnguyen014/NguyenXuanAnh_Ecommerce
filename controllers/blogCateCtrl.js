const BlogCategory = require("../models/blogCateModel");
const asyHandler = require("express-async-handler");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");

//create PCategory
const createBCategory = asyHandler(async (req, res) => {
  try {
    const newBCategory = await BlogCategory.create(req.body);
    res.json(newBCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//update Category
const updateBCategory = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const updatedBCategory = await BlogCategory.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    res.json(updatedBCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get a category

const getBCategory = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findBCategory = await BlogCategory.findById(id);

    res.json(findBCategory);
  } catch (error) {
    throw new Error(error);
  }
});

//get all Category
const getAllBCategory = asyHandler(async (req, res) => {
  try {
    const getAll = await BlogCategory.find();
    res.json(getAll);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a category
const deleteBCategory = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findBCategory = await BlogCategory.findByIdAndDelete(id);
    res.json({
      success: true,
      findBCategory,
    });
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBCategory,
  updateBCategory,
  getBCategory,
  getAllBCategory,
  deleteBCategory,
};
