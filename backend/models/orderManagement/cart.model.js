const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
  {
    SiteManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    ProductName: {
      type: String,
      required: true,
    },
    ProductId: {
      type: String,
      required: true,
    },
    ProductImage: {
      type: String,
    },
    Supplier: {
      type: String,
      required: true,
    },
    Qty: {
      type: Number,
      required: true,
    },
    Total: { type: Number, required: true },
  },
  { timestamps: true }
);

const cart = new mongoose.model("cart", CartSchema);

module.exports = cart;
