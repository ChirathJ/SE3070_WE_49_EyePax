const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    SiteManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Products: [
      {
        ProductDetails: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        Qty: {
          type: Number,
          required: true,
        },
        Total: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

const cart = new mongoose.model("cart", CartSchema);

module.exports = cart;
