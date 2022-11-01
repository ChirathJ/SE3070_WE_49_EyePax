const express = require("express");
const Cart = require("../../models/orderManagement/cart.model");
const router = express.Router();

/* Add New Item to Cart */
router.post("/add", async (req, res) => {
  try {
    // assign the data coming from the req body to separate variable
    const oldData = req.body;

    const newItem = new Cart({
      SiteManager: oldData.SiteManager,
      Products: [
        {
          ProductDetails: oldData.ProductDetails,
          Qty: oldData.Qty,
          Total: oldData.Total,
        },
      ],
    });

    await newItem.save();
    return res.status(201).json({ message: "Added to Cart" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get All Items in the Cart */
router.get("/getAll", async (req, res) => {
  try {
    const details = await Cart.find({})
      .populate("SiteManager")
      .populate("ProductDetails");

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});


module.exports = router;
