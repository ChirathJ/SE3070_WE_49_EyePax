const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  ProductCode: {
    type: String,
    required: true,
  },
  ProductName: {
    type: String,
    required: true,
  },
  Description: {
    type: String,
    required: true,
  },
  Qty: {
    type: String,
    required: true,
  },
  Price: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    default: "Rejected",
  },
  Image: {
    type: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const products = new mongoose.model("products", productSchema);

module.exports = products;
