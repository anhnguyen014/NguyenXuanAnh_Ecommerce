const Brand = require("../models/brandModel");
const asyHandler = require("express-async-handler");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");
const { cloudinaryUploadImg } = require("../utils/cloudinary");
const fs = require("fs");

//create PBrand
const createBrand = asyHandler(async (req, res) => {
  try {
    const newBrand = await Brand.create(req.body);
    res.json(newBrand);
  } catch (error) {
    throw new Error(error);
  }
});

//update Brand
const updateBrand = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const updatedBrand = await Brand.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedBrand);
  } catch (error) {
    throw new Error(error);
  }
});

//get a Brand

const getBrand = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findBrand = await Brand.findById(id);

    res.json(findBrand);
  } catch (error) {
    throw new Error(error);
  }
});

//get all Brand
const getAllBrand = asyHandler(async (req, res) => {
  try {
    const getAll = await Brand.find();
    res.json(getAll);
  } catch (error) {
    throw new Error(error);
  }
});

//Delete a Brand
const deleteBrand = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const findBrand = await Brand.findByIdAndDelete(id);
    res.json({
      success: true,
      findBrand,
    });
  } catch (error) {
    throw new Error(error);
  }
});

const updateImages = asyHandler(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);

      urls.push(newpath);
      fs.unlinkSync(path);
    }
    const findBrand = await Brand.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBrand);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createBrand,
  updateBrand,
  getBrand,
  getAllBrand,
  deleteBrand,
  updateImages,
};
