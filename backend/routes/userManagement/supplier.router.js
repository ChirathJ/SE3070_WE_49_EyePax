const router = require("express").Router();
const User = require("../../models/userManagement/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validation = require("../../utils/userManagement/validation.util");
const service = require("../../utils/userManagement/service.util");
const userAccess = require("../../middleware/accessChecker");

/* The above code is a route handler for the /register route. It is used to register a new user. */
router.post("/register", async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await validation.supplierRegisterSchema.validateAsync(
      req.body
    );

    /* Checking if the Name is already in the database. */
    const user = await User.findOne({ Email: validated.Email });

    /* Checking if the Name is already in the database. */
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this Email already exists.",
      });

    // hash the password
    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(validated.password, salt);

    /* Generating a random string of length 10. */
    var id = Math.random().toString(8).substring(5, 15);
    id = "S" + id;

    // save a new user account to the db
    const newUser = new User({
      id: id,
      name: validated.name,
      email: validated.email,
      mobile: validated.mobile,
      address: validated.address,
      userType: "Supplier",
      passwordHash: passwordHash,
    });

    /* Saving the new User to the database. */
    await newUser.save();

    /* Sending a response to the client. */
    res.status(201).send({ Message: "User created successfully." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a route handler for the /profile route. It is used to get the user information. */
router.get("/profile", userAccess, async (req, res) => {
  try {
    res.json(req.body.user);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

module.exports = router;
