const express = require("express");
const Inquiry = require("../../models/orderManagement/inquiry.model");
const router = express.Router();

/* Add an Inquiry */
router.post("/add", async (req, res) => {
  try {
    // assign the data coming from the req body to separate variable
    const oldData = req.body;

    const inquiry = new Inquiry({
      Order: oldData.Order._id,
      inquiry: oldData.Inquiry,
    });

    await inquiry.save();
    return res.status(201).json({ message: "Inquiry Added Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
