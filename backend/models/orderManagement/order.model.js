const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    OrderId: { type: String, required: true },
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
    SiteAddress: { type: String, required: true },
    DeliveryDate: { type: String, required: true },
    TotalPrice: { type: Number, required: true },
    DeliveryStatus: { type: String, required: true },
    Comment: { type: String, required: false },
    Approval: { type: String, required: true, default: "Approved" },
  },
  { timestamps: true }
);

const orders = new mongoose.model("orders", OrderSchema);

module.exports = orders;
