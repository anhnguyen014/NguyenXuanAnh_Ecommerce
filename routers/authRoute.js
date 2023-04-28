const express = require("express");
const {
  register,
  login,
  logout,
  deleteUser,
  getallUser,
  getSingleUser,
  updateUser,
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
  emptyCart,
} = require("../controllers/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddlewares");
const { checkout, paymentVerification } = require("../controllers/paymentCtrl");

const router = express.Router();

//Register

router.post("/register", register);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/password", authMiddleware, updatePassword);
// router.put(
//   "/order/update-order/:id",
//   authMiddleware,
//   isAdmin,
//   updateOrderStatus
// );

router.post("/login", login);
router.post("/admin-login", loginAdmin);
router.post("/cart", authMiddleware, userCart);
router.post("/order/checkout", authMiddleware, checkout);
router.post("/order/payment-verification", authMiddleware, paymentVerification);
// router.post("/cart/apply-coupon", authMiddleware, applyCoupon);
router.post("/cart/create-order", authMiddleware, createOrder);
router.get("/all-users", getallUser);
router.get("/get-my-order", authMiddleware, getMyOrder);
router.get("/get-allOrders", authMiddleware, isAdmin, getAllOrder);
router.get("/get-a-order/:id", authMiddleware, isAdmin, getSingleOrder);
router.put("/update-order/:id", authMiddleware, isAdmin, updateOrder);
// router.post("/get-order-by-user/:id", authMiddleware, isAdmin, getAllOrder);
router.get("/getMonthWiseOrderIncome", authMiddleware, getMothWiseOrderIncome);
router.get("/getYearlyTotalOrder", authMiddleware, getYearlyTotalOrder);

router.get("/refresh", handleRefreshToken);

router.get("/logout", logout);
router.get("/wishlist", authMiddleware, getWishList);
router.get("/cart", authMiddleware, getUserCart);

router.get("/:id", getSingleUser);
// router.delete("/empty-cart", authMiddleware, emptyCart);
router.delete(
  "/delete-product-cart/:cartItemId",
  authMiddleware,
  removeProductFromCart
);
router.delete(
  "/update-product-cart/:cartItemId/:newQuantity",
  authMiddleware,
  updateProductQuantityFromCart
);
router.delete("/empty-cart", authMiddleware, emptyCart);

router.delete("/:id", authMiddleware, isAdmin, deleteUser);

router.put("/edit-user", authMiddleware, updateUser);
router.put("/save-address", authMiddleware, saveAddress);

router.put("/blocked-user/:id", authMiddleware, isAdmin, blockedUser);
router.put("/unblocked-user/:id", authMiddleware, isAdmin, unblockedUser);

module.exports = router;
