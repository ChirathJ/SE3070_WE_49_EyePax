const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    EmpID: { type: String, required: true, unique: true },
    Name: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    Mobile: { type: Number },
    Age: { type: Number, required: true },
    Sex: { type: String, required: true },
    Position: { type: String, required: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
