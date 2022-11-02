const mongoose = require("mongoose");

const InquirySchema = new mongoose.Schema(
  {
    Order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "orders",
      required: true,
    },
    inquiry: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const inquiry = new mongoose.model("inquiry", InquirySchema);

module.exports = inquiry;
