const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    OrderId: { type: String, required: true, unique: true },
    SiteManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    Cart: [
      {
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
    ],
    SiteAddress: { type: String, required: true },
    DeliveryDate: { type: String, required: true },
    TotalPrice: { type: Number, required: true },
    DeliveryStatus: { type: String, default: "Not Delivered" },
    Comment: { type: String, required: false },
    Approval: { type: String, default: "Approved" },
  },
  { timestamps: true }
);

const orders = new mongoose.model("orders", OrderSchema);

module.exports = orders;
