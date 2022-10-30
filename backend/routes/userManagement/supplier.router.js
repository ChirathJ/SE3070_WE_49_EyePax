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

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/", userAccess, async (req, res) => {
  try {
    /* Destructuring the query parameters. */
    let { page, size, search, filter } = req.query;
    /* Checking if the page and size query parameters are not present, then it is setting the default
    values. */
    if (!page) {
      page = 1;
    }
    if (!size) {
      size = 10;
    }
    let users = [];
    let total;
    let totalPage = 1;

    /* Finding all the admins in the database. */
    users = await User.find()
      .skip((page - 1) * size)
      .limit(size)
      .exec();

    /* count total users in the database. */
    total = await User.countDocuments();
    totalPage = parseInt(total / size + 1);
    /* Sending the users object to the client. */
    res.json({ users: users, total: total, totalPage: totalPage });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the update route. It is updating the user account. */
router.put("/update", userAccess, async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await validation.userUpdateSchema.validateAsync(req.body);

    /* Updating the user account. */
    await User.findByIdAndUpdate(req.body.user._id, validated).exec();

    res.status(201).send({ Message: "Successfully updated the user." });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

/* This is a route handler for the /admin-register route. It is used to register a new admin. */
router.post("/create-user", userAccess, async (req, res) => {
  try {
    /* Validating the request body. */
    const validated = await validation.createUserSchema.validateAsync(req.body);

    /* Checking if the email is already in the database. */
    const user = await User.findOne({ email: validated.email });
    if (user)
      return res.status(400).json({
        errorMessage: "An account with this email already exists.",
      });

    /* Generating a random string of length 10. */
    const oneTimePassword = crypto.randomBytes(10).toString("hex");

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(oneTimePassword, salt);

    // save a new user account to the db
    const newUser = new User({
      firstName: validated.firstName,
      lastName: validated.lastName,
      email: validated.email,
      mobile: validated.mobile,
      dob: validated.dob,
      passwordHash: hashedPassword,
      userType: validated.userType,
      adminCreated: true,
    });

    /* Saving the new user to the database. */
    const savedUser = await newUser.save();

    /* Sending an verification email to the user. */
    await email.sendVerification(savedUser.email, oneTimePassword);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully created a new user" });
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

//loggedin user can access
//delete loggedin account
/* Deleting the user account. */
router.delete("/delete", userAccess, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.user._id);

    /* Removing the cookie from the browser. */
    await service.removeCookie(res);
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

//Admin user can access
//delete user account
/* Deleting the user account. */
router.delete("/delete/:id", userAccess, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully deleted" });
  } catch (err) {
    res.json(false);
    console.error(err);
    res.status(500).send();
  }
});

/* The above code is a route that is used to update an admin. */
router.put("/update/admin", userAccess, async (req, res) => {
  try {
    /* Validating the request body using the Joi schema. */
    const validated = await validation.userUpdateSchema.validateAsync(req.body);

    /* Calling the function updateAdmin from functions.util.js and passing the validated id and validated
object. */
    await User.findByIdAndUpdate(validated.id, validated);

    /* Sending a response to the client. */
    res.status(201).send({ Message: "Successfully updated" });
  } catch (err) {
    if (err.isJoi === true) {
      console.error(err);
      return res.status(422).send({ errorMessage: err.details[0].message });
    } else {
      res.json(false);
      console.error(err);
      res.status(500).send(err);
    }
  }
});

module.exports = router;
