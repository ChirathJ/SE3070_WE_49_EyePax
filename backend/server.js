const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const bodyParser = require("body-parser");
const product = require("./routes/productManagement/product.route");
const path = require("path");
/* Loading the environment variables from the .env file. */
dotenv.config();

//
// ─── SET UP SERVER ──────────────────────────────────────────────────────────────
//

/* Creating an instance of express. */
const app = express();

/* Setting the port to 8000. */
const PORT = process.env.PORT || 8000;

/* Starting the server on the port 8000. */
app.listen(PORT, () => console.log(`Successfully Server started on : ${PORT}`));

/* A middleware that parses the body of the request and makes it available in the req.body property. */
app.use(express.json());
/* Parsing the cookie and making it available in the req.cookies property. */
app.use(cookieParser());
/* Allowing the server to accept requests from the client. */
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(bodyParser.json());

//
// ─── CONNECT TO MONGODB ─────────────────────────────────────────────────────────
//

mongoose.connect(
  process.env.DBLINK,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.error(err);
    console.log("Successfully Connected to MongoDB");
  }
);

//
// ─── SET UP ROUTES ──────────────────────────────────────────────────────────────
//

//User management routes
app.use("/supplier", require("./routes/userManagement/supplier.router"));
app.use("/user", require("./routes/userManagement/user.router"));
app.use("/", require("./routes/userManagement/authentication.router"));
app.use(product);
app.use("/order", require("./routes/orderManagement/order.route"));
app.use("/cart", require("./routes/orderManagement/cart.route"));
app.use("/inquiry", require("./routes/orderManagement/inquiry.route"));
app.get("/fetchImage/:file(*)", (req, res) => {
  let file = req.params.file;
  let fileLocation = path.join(
    __dirname,
    "../backend/routes/productManagement/ProductImages/",
    file
  );
  res.sendFile(`${fileLocation}`);
});
