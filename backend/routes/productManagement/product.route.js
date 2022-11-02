const express = require("express");
const router = express.Router();
const products = require("../../models/productManagement/product.model");
const User = require("../../models/userManagement/user.model");
const multer = require("multer");
const { v4: uuidv4 } = require("uuid");
let path = require("path");
const userAccess = require("../../middleware/accessChecker");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../backend/routes/productManagement/ProductImages");
  },
  filename: function (req, file, cb) {
    cb(null, uuidv4() + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

let upload = multer({ storage, fileFilter });

router.post(
  "/product/new",
  upload.single("Image"),
  userAccess,
  async (req, res) => {
    const { ProductCode, ProductName, Description, Qty, Price, user } =
      req.body;

    if (!ProductCode || !ProductName || !Description || !Qty || !Price) {
      res.status(422).json("Please enter all data");
      return 0;
    } else if (Qty > 20) {
      res.status(420).json("Qty should be less than 20");
      return 0;
    } else if (Qty.length > 20) {
      res.status(420).json("Description should be less than 20 characters");
      return 0;
    } else {
      try {
        const addproduct = new products({
          ProductCode: req.body.ProductCode,
          ProductName: req.body.ProductName,
          Description: req.body.Description,
          Qty: req.body.Qty,
          Price: req.body.Price,
          Image: req.file.filename,
          user: req.body.user._id,
        });

        await addproduct.save();
        res.status(201).json(addproduct);
      } catch (error) {
        res.status(422).json(error);
      }
    }
  }
);

// get product data

router.get("/product/viewp", async (req, res) => {
  try {
    const pageNo = req.query.pageNo || 1;
    const itemsPerPage = req.query.pageSize || 10;
    const skip = (pageNo - 1) * itemsPerPage;
    const count = await products.estimatedDocumentCount();
    const pageCount = Math.ceil(count / itemsPerPage);

    const getproductdata = await products
      .find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .populate("user");

    res.status(201).json({ pagination: { count, pageCount }, getproductdata });
  } catch (error) {
    return res.status(422).json(error);
  }
});

router.get("/product/view-current", userAccess, async (req, res) => {
  try {
    const pageNo = req.query.pageNo || 1;
    const itemsPerPage = req.query.pageSize || 10;
    const skip = (pageNo - 1) * itemsPerPage;
    const count = await products.estimatedDocumentCount();
    const pageCount = Math.ceil(count / itemsPerPage);
    
    const getproductdata = await products
      .find({ user: req.body.user._id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .populate("user");

    res.status(201).json({ pagination: { count, pageCount }, getproductdata });
  } catch (error) {
    return res.status(422).json(error);
  }
});

router.get("/product/view-supplier/:id", async (req, res) => {
    try {
    const { id } = req.params;
      
    const pageNo = req.query.pageNo || 1;
    const itemsPerPage = req.query.pageSize || 10;
    const skip = (pageNo - 1) * itemsPerPage;
    const count = await products.estimatedDocumentCount();
    const pageCount = Math.ceil(count / itemsPerPage);
    
    const getproductdata = await products
      .find({ user: id })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(itemsPerPage)
      .populate("user");

    res.status(201).json({ pagination: { count, pageCount }, getproductdata });
  } catch (error) {
    return res.status(422).json(error);
  }
});

// get individual product

router.get("/product/view/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const productindividual = await products.findById({ _id: id });
    res.status(201).json(productindividual);
  } catch (error) {
    res.status(422).json(error);
  }
});

// update product data

router.patch("/product/update/:id", async (req, res) => {
  const { ProductCode, ProductName, Description, Qty, Price, Image } = req.body;
  if (
    !ProductCode ||
    !ProductName ||
    !Description ||
    !Qty ||
    !Price ||
    !Image
  ) {
    res.status(422).json("Please enter all data");
    return 0;
  } else if (Qty > 20) {
    res.status(420).json("Qty should be less than 20");
    return 0;
  } else if (Qty.length > 20) {
    res.status(420).json("Description should be less than 20 characters");
    return 0;
  }
  try {
    const { id } = req.params;

    const updateproduct = await products.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(201).json(updateproduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

// delete product
router.delete("/product/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteproduct = await products.findByIdAndDelete({ _id: id });
    res.status(201).json(deleteproduct);
  } catch (error) {
    res.status(422).json(error);
  }
});

module.exports = router;
