const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandle = require("express-async-handler");
const slugify = require("slugify");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");

//Create Product
const createProduct = asyncHandle(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});

//Get all Product

const getAllProduct = asyncHandle(async (req, res) => {
  try {
    //Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    console.log(queryObj);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    // Limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This page do not Exists");
    }
    console.log(page, limit, skip);
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

// Get a product

const getProduct = asyncHandle(async (req, res) => {
  const { id } = req.params;

  try {
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});

// Update Product

const updatedProduct = asyncHandle(async (req, res) => {
  const { id } = req.params;

  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const updateProduct = await Product.findByIdAndUpdate(id, req.body, {
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

//delete Product

const deletedProduct = asyncHandle(async (req, res) => {
  const { id } = req.params;

  try {
    const deleteProduct = await Product.findByIdAndDelete(id);
    res.json({
      success: true,
      deleteProduct,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// Add to WishList
const addToWishList = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  console.log(prodId);
  try {
    const user = await User.findById(_id);
    const already = user.wishlist.find((id) => id.toString() === prodId);
    console.log(already);
    if (already) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

// Rating

const rating = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  console.log(_id);
  const { star, prodId, comment } = req.body;
  console.log(star, prodId);
  try {
    const product = await Product.findById(prodId);
    console.log(product);
    let alreadyRated = product.ratings.find(
      (userId) => userId.postedBy.toString() === _id.toString()
    );
    console.log(alreadyRated);
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          ratings: { $elemMatch: alreadyRated },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: { star: star, comment: comment, postedBy: _id },
          },
        },
        {
          new: true,
        }
      );
    }

    const getAllRatings = await Product.findById(prodId);
    let totalRating = getAllRatings.ratings.length;
    let ratingSum = getAllRatings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingSum / totalRating);
    console.log(actualRating);
    let finalProduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalRating: actualRating,
      },
      { new: true }
    );
    res.json(finalProduct);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updatedProduct,
  deletedProduct,
  addToWishList,
  rating,
};
