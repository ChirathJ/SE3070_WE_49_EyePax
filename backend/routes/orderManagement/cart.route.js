const express = require("express");
const Cart = require("../../models/orderManagement/cart.model");
const router = express.Router();

/* Add New Item to Cart */
router.post("/add", async (req, res) => {
  try {
    // assign the data coming from the req body to separate variable
    const oldData = req.body;

    const newItem = new Cart({
      SiteManager: oldData.User._id,
      ProductName: oldData.ProductName._id,
      ProductId: oldData.ProductId._id,
      Supplier: oldData.Supplier._id,
      Qty: oldData.Qty,
      Total: oldData.Total,
    });

    await newItem.save();
    return res.status(201).json({ message: "Added to Cart" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get All Items in the Cart */
router.get("/getAll/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Cart.find({ SiteManager: id });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Delete All in the Cart */
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Cart.deleteMany({ id });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
