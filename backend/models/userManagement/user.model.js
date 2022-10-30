const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: Number, required: true },
    age: { type: Number},
    sex: { type: String},
    address: { type: String},
    userType: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
