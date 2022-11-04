const express = require("express");
const Orders = require("../../models/orderManagement/order.model");
const router = express.Router();
const Cart = require("../../models/orderManagement/cart.model");

/* Add New Order */
router.post("/add", async (req, res) => {
  try {
    // assign the data coming from the req body to separate variable
    const oldData = req.body;

    const newOrder = new Orders({
      OrderId: "SP" + Math.floor(Math.random() * 900000 + 100000),
      SiteManager: oldData.SiteManager,
      Cart: oldData.Cart, // send this as an array
      SiteAddress: oldData.SiteAddress,
      DeliveryDate: oldData.DeliveryDate,
      TotalPrice: oldData.TotalPrice,
      DeliveryStatus: oldData.DeliveryStatus,
      Comment: oldData.Comment,
      Approval: oldData.Approval,
    });

    await newOrder.save();
    await Cart.deleteMany({ SiteManager: oldData.SiteManager });
    return res.status(201).json({ message: "Order Confirmed Successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
});

/* Get All Orders By Site Manager's Id*/
router.get("/getAll/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Orders.find({ SiteManager: id, Approval: "Approved" })
      .populate("Cart")
      .populate("SiteManager");

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get All Orders */
router.get("/getAll", async (req, res) => {
  try {
    const details = await Orders.find()
      .populate("SiteManager")
      .populate("Cart");

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get Order by ID */
router.get("/getById/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Orders.findOne({ _id: id });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Update Delivery Status */
router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deliveryStatus = "Delivered";
    const details = await Orders.findByIdAndUpdate(id, {
      DeliveryStatus: deliveryStatus,
    }).exec();

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Update Approval Status */
router.put("/update/Approval/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const details = await Orders.findByIdAndUpdate(id, req.body).exec();

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Search an Order */
router.get("/search/:searchTerm", async (req, res) => {
  try {
    // using "$options: 'i'" for case insensitive search
    const details = await Orders.find({ Approval: "Approved" }).find({
      $or: [
        {
          OrderId: { $regex: req.params.searchTerm, $options: "i" },
        },
      ],
    });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get Orders According to Deliver Status */
router.get("/:deliveryStatus", async (req, res) => {
  try {
    const details = await Orders.count({
      DeliveryStatus: req.params.deliveryStatus,
    });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

/* Get Orders According to Approval Status */
router.get("/approval/:status", async (req, res) => {
  try {
    const details = await Orders.count({
      Approval: req.params.status,
    });

    return res.status(200).json({
      data: details,
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

module.exports = router;
