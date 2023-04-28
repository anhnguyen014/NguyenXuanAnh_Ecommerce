const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: "rzp_test_hXQ6AEK6v078B8",
  key_secret: "YelpDBQIXGo6iOK8ekxrF9FU",
});

const checkout = async (req, res) => {
  const { amount } = req.body;
  const option = {
    amount: amount,
    currency: "INR",
  };
  const order = await instance.orders.create(option);
  res.json({ success: true, order });
};

const paymentVerification = async (req, res) => {
  const { razorpayOrderId, razorpayPaymentId } = req.body;
  res.json({ razorpayPaymentId, razorpayOrderId });
};

module.exports = {
  checkout,
  paymentVerification,
};
