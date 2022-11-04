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
      ProductName: oldData.ProductName,
      ProductId: oldData.ProductId,
      ProductImage: oldData.ProductImage,
      Supplier: oldData.Supplier,
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
    const details = await Cart.deleteMany({ SiteManager: id });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Delete Single Item in Cart */
router.delete("/deleteOne/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Cart.findByIdAndDelete({ _id: id });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
