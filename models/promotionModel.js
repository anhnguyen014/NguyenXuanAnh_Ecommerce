const mongoose = require("mongoose"); // Erase if already required

const promotionSchema = new mongoose.Schema(
  {
    productID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    discount: {
      type: Number,
      required: false,
    },
    startDate: {
      type: Date,
      required: false,
    },
    endDate: {
      type: Date,
      required: false,
    },
    status: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Promotion", promotionSchema);
