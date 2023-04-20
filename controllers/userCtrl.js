const User = require("../models/userModel");
const Product = require("../models/productModel");
const Cart = require("../models/cartModel");
const Coupon = require("../models/couponModel");
const Order = require("../models/orderModel");
const asyncHandle = require("express-async-handler");
const bcrypt = require("bcrypt");

const uniqid = require("uniqid");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
const { validateMoongodbId } = require("../utils/vaidateMongodbid");
const { refreshToken } = require("../config/refreshToken");
const { generateToken } = require("../config/jwtToken");
const crypto = require("crypto");
const sendEmail = require("./emailCtrl");
const { updateOne } = require("../models/couponModel");
const { log } = require("console");

//Register User

const register = asyncHandle(async (req, res) => {
  const username = req.body.name;
  const findUser = await User.findOne({ username: username });
  if (!findUser) {
    // Create a new USER
    const hash = bcrypt.hashSync(req.body.password, 10);
    const newUser = new User({
      ...req.body,
      password: hash,
    });
    await newUser.save();
    res.json(newUser);
  } else {
    //User Already Exists
    throw new Error("User Already Exists");
  }
});

//Login

// const login = asyncHandle(async (req, res) => {
//   const user = await User.findOne({ username: req.body.username });
//   if (!user) {
//     throw new Error("Not Found ID");
//   }
//   const isCorrect = bcrypt.compareSync(req.body.password, user.password);
//   if (!isCorrect) {
//     throw new Error("Wrong password!");
//   }
//   const token = jwt.sign(
//     {
//       id: user._id,
//       role: user.role,
//     },
//     process.env.JWT_KEY
//   );

//   const { password, ...info } = user._doc;
//   res
//     .cookie("accessToken", token, {
//       httpOnly: true,
//       maxAge: 24 * 60 * 60 * 1000,
//     })
//     .json(info);
// });
//Login
const login = asyncHandle(async (req, res) => {
  const findUser = await User.findOne({ username: req.body.username });
  const isCorrect = bcrypt.compareSync(req.body.password, findUser.password);
  if (findUser && isCorrect) {
    const refreshTokened = await refreshToken(findUser?._id);
    const updateuser = await User.findByIdAndUpdate(
      findUser.id,
      {
        refreshToken: refreshTokened,
      },
      {
        new: true,
      }
    );
    res.cookie("accessToken", refreshTokened, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findUser?._id,
      firstname: findUser?.firstname,
      lastname: findUser?.lastname,
      username: findUser?.username,
      email: findUser?.email,
      mobile: findUser?.mobile,
      token: generateToken(findUser?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
// login Admin

const loginAdmin = asyncHandle(async (req, res) => {
  const findAdmin = await User.findOne({ username: req.body.username });
  const isCorrect = bcrypt.compareSync(req.body.password, findAdmin.password);

  if (findAdmin.role !== "admin") throw new Error("Not Admin");
  if (findAdmin && isCorrect) {
    const refreshTokened = await refreshToken(findAdmin?._id);
    const updateuser = await User.findByIdAndUpdate(
      findAdmin.id,
      {
        refreshToken: refreshTokened,
      },
      {
        new: true,
      }
    );
    res.cookie("accessToken", refreshTokened, {
      httpOnly: true,
      maxAge: 72 * 60 * 60 * 1000,
    });
    res.json({
      _id: findAdmin?._id,
      firstname: findAdmin?.firstname,
      lastname: findAdmin?.lastname,
      username: findAdmin?.username,
      email: findAdmin?.email,
      mobile: findAdmin?.mobile,
      token: generateToken(findAdmin?._id),
    });
  } else {
    throw new Error("Invalid Credentials");
  }
});
//handle refresh Token
const handleRefreshToken = asyncHandle(async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.accessToken) {
    throw new Error("No Refresh Token in Cookies");
  }
  const refreshToken = cookie.accessToken;
  console.log(refreshToken);
  const user = await User.findOne({ refreshToken });
  if (!user) {
    throw new Error("No Refresh Token present in db or not matching");
  }
  jwt.verify(refreshToken, process.env.JWT_KEY, (err, decoded) => {
    if (err || user.id !== decoded.id) {
      throw new Error("There is something wrong with refresh token");
    }
    const accessToken = generateToken(user?.id);
    res.json({ accessToken });
  });
});

//logout functionally

const logout = asyncHandle(async (req, res) => {
  //   const cookie = req.cookies;
  //   if (!cookie?.accessToken) {
  //     throw new Error("No Refresh Token in Cookies");
  //   }
  //   const refreshToken = cookie.accessToken;
  //   const user = await User.findOne({ refreshToken });
  //   console.log(user); //
  //   if (!user) {
  //     res.clearCookie("accessToken", { httpOnly: true, secure: true });
  //     return res.sendStatus(204); //forbidden(Cấm)
  //   }
  //   await User.findByIdAndUpdate(refreshToken, {
  //     accessToken: " ",
  //   });
  //   res.clearCookie("accessToken", { httpOnly: true, secure: true });
  //   res.sendStatus(204);
  res.cookie("accessToken", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
// Delete User
const deleteUser = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);
  try {
    const deleted = await User.findByIdAndDelete(id);
    res.json({
      deleted,
      success: true,
    });
  } catch (error) {
    throw new Error(error);
  }
});

// save Address

const saveAddress = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  validateMoongodbId(_id);
  try {
    const updateUser = await User.findByIdAndUpdate(
      _id,
      {
        address: req?.body?.address,
      },
      {
        new: true,
      }
    );
    res.json(updateUser);
  } catch (error) {
    throw new Error(error);
  }
});

//get all
const getallUser = asyncHandle(async (req, res) => {
  try {
    const getUser = await User.find();
    res.json(getUser);
  } catch (error) {
    throw new Error(error);
  }
});

//get single user

const getSingleUser = asyncHandle(async (req, res) => {
  const { id } = req.params;
  try {
    const findUser = await User.findById(id);
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

//update
const updateUser = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  validateMoongodbId(_id);
  try {
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      {
        firstname: req?.body?.firstname,
        lastname: req?.body?.lastname,
        username: req?.body?.username,
        email: req?.body?.email,
        mobile: req?.body?.mobile,
        role: req?.body?.role,
      },
      {
        new: true,
      }
    );
    res.json(updatedUser);
  } catch (error) {
    throw new Error(error);
  }
});

//Block User
const blockedUser = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);

  try {
    const block = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      {
        new: true,
      }
    );
    res.json({
      block,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//Unblock User
const unblockedUser = asyncHandle(async (req, res) => {
  const { id } = req.params;
  validateMoongodbId(id);

  try {
    const unblock = await User.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      {
        new: true,
      }
    );
    res.json({
      unblock,
    });
  } catch (error) {
    throw new Error(error);
  }
});

//update Password

const updatePassword = asyncHandle(async (req, res) => {
  try {
    //get password
    const { password } = req.body;
    //hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hashSync(password, salt);

    const update = await User.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: hashPassword,
      }
    );

    res.json({ success: "Update Success", update });
  } catch (error) {
    throw new Error(error);
  }
  //   const { id } = req.user;
  //   console.log(id);
  //   const salt = await bcrypt.genSalt(10);
  //   const password = await bcrypt.compare(req.body.password, salt);
  //   const userPassword = await User.findByIdAndUpdate(
  //     { _id: id },
  //     { password: password },
  //     { new: true }
  //   );
  //   await userPassword.save();
  //   res.json(userPassword);
});

//forgotPassword
const forgotPasswordToken = asyncHandle(async (req, res) => {
  const { email } = req.body;
  console.log(email);
  const user = await User.findOne({ email });
  console.log({ user });
  if (!user) throw new Error("User not found with email");
  try {
    const token = await user.createPasswordToken();
    await user.save();
    const resetURL = `Hi please follow this link reset your password. This link is valid till 10 minutes from now. <a href='http://localhost:3000/reset-password/${token}'>Click here</a> `;
    const data = {
      to: email,
      subject: "Forgot Password Link",
      text: "Hey User",
      html: resetURL,
    };
    console.log(data);
    sendEmail(data);
    // console.log(data);
    res.json(token);
  } catch (error) {
    throw new Error(error);
  }
});

//get wishList

const getWishList = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  try {
    const findUser = await User.findById(_id).populate("wishlist");
    res.json(findUser);
  } catch (error) {
    throw new Error(error);
  }
});

// User Cart

const userCart = asyncHandle(async (req, res) => {
  const { productId, color, quantity, price } = req.body;
  const { _id } = req.user;
  validateMoongodbId(_id);
  try {
    let newCart = await new Cart({
      userId: _id,
      productId,
      color,
      quantity,
      price,
    }).save();
    res.json(newCart);
  } catch (error) {
    throw new Error(error);
  }
});

//get user cart

const getUserCart = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  validateMoongodbId(_id);
  try {
    const cart = await Cart.find({ userId: _id })
      .populate("productId")
      .populate("color");
    res.json(cart);
  } catch (error) {
    throw new Error(error);
  }
});
// remove product from cart
const removeProductFromCart = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  validateMoongodbId(_id);
  const { cartItemId } = req.params;
  try {
    const deleteProductFromCart = await Cart.deleteOne({
      userId: _id,
      _id: cartItemId,
    });
    res.json(deleteProductFromCart);
  } catch (error) {
    throw new Error(error);
  }
});

//update product quantity
const updateProductQuantityFromCart = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  validateMoongodbId(_id);
  const { cartItemId, newQuantity } = req.params;
  try {
    const cartItem = await Cart.findOne({
      userId: _id,
      _id: cartItemId,
    });
    cartItem.quantity = newQuantity;
    cartItem.save();
    res.json(cartItem);
  } catch (error) {
    throw new Error(error);
  }
});

//create Order
const createOrder = asyncHandle(async (req, res) => {
  const {
    shippingInfo,
    orderItems,
    totalPrice,
    totalPriceAfterDiscount,
    paymentInfo,
  } = req.body;
  const { _id } = req.user;
  try {
    const order = await Order.create({
      user: _id,
      shippingInfo,
      orderItems,
      totalPrice,
      totalPriceAfterDiscount,
      paymentInfo,
    });
    res.json({ order, success: "Order Created" });
  } catch (error) {
    throw new Error(error);
  }
});

const getMyOrder = asyncHandle(async (req, res) => {
  const { _id } = req.user;
  validateMoongodbId(_id);
  try {
    const orders = await Order.find({ user: _id })
      .populate("user")
      .populate("orderItems.product")
      .populate("orderItems.color");
    res.json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

const getAllOrder = asyncHandle(async (req, res) => {
  try {
    const orders = await Order.find().populate("user");

    res.json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});
const getSingleOrder = asyncHandle(async (req, res) => {
  const { id } = req.params;
  // validateMoongodbId(_id);
  try {
    const orders = await Order.findOne({ _id: id })
      .populate("orderItems.product")
      .populate("orderItems.color");

    res.json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

const updateOrder = asyncHandle(async (req, res) => {
  const { id } = req.params;
  // validateMoongodbId(_id);
  try {
    const orders = await Order.findById(id);
    orders.orderStatus = req.body.status;
    await orders.save();

    res.json({ orders });
  } catch (error) {
    throw new Error(error);
  }
});

const getMothWiseOrderIncome = asyncHandle(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: {
          month: "$month",
        },
        amount: { $sum: "$totalPriceAfterDiscount" },
        count: { $sum: 1 },
      },
    },
  ]);
  res.json(data);
});

const getYearlyTotalOrder = asyncHandle(async (req, res) => {
  let monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let d = new Date();
  let endDate = "";
  d.setDate(1);
  for (let index = 0; index < 11; index++) {
    d.setMonth(d.getMonth() - 1);
    endDate = monthNames[d.getMonth()] + " " + d.getFullYear();
  }
  const data = await Order.aggregate([
    {
      $match: {
        createdAt: {
          $lte: new Date(),
          $gte: new Date(endDate),
        },
      },
    },
    {
      $group: {
        _id: null,
        count: { $sum: 1 },
        amount: { $sum: "$totalPriceAfterDiscount" },
      },
    },
  ]);
  res.json(data);
});

// //apply coupon

// const applyCoupon = asyncHandle(async (req, res) => {
//   const { coupon } = req.body;
//   const { _id } = req.user;
//   validateMoongodbId(_id);
//   try {
//     const validCoupon = await Coupon.findOne({ name: coupon });
//     if (validCoupon === null) {
//       throw new Error("Invalid Coupon");
//     }
//     const user = await User.findOne({ _id });
//     let { cartTotal } = await Cart.findOne({
//       orderBy: user._id,
//     }).populate("products.product");
//     let totalAfterDiscount = (
//       cartTotal -
//       (cartTotal * validCoupon.discount) / 100
//     ).toFixed(2);
//     await Cart.findOneAndUpdate(
//       { orderBy: user._id },
//       { totalAfterDiscount },
//       { new: true }
//     );
//     res.json(totalAfterDiscount);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// //create Order

// //get Order

// //getAllOrder

// const getAllOrder = asyncHandle(async (req, res) => {
//   try {
//     const alluserOrder = await Order.find()
//       .populate("products.product")
//       .populate("orderBy")

//       .exec();
//     res.json(alluserOrder);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// const getOrderByUserId = asyncHandle(async (req, res) => {
//   const { _id } = req.params;
//   validateMoongodbId(_id);
//   try {
//     const userOrder = await Order.findOne({ orderBy: _id })
//       .populate("products.product")
//       .populate("orderBy")

//       .exec();
//     res.json(userOrder);
//   } catch (error) {
//     throw new Error(error);
//   }
// });

// //update order

module.exports = {
  register,
  login,
  logout,
  deleteUser,
  getallUser,
  getSingleUser,
  updateUser,
  deleteUser,
  blockedUser,
  unblockedUser,
  handleRefreshToken,
  updatePassword,
  forgotPasswordToken,
  loginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,

  createOrder,
  removeProductFromCart,
  updateProductQuantityFromCart,
  getMyOrder,
  getMothWiseOrderIncome,

  getYearlyTotalOrder,
  getAllOrder,
  getSingleOrder,
  updateOrder,
};
