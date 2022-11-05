const router = require("express").Router();
const User = require("../../models/userManagement/user.model");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const validation = require("../../utils/userManagement/validation.util");
const service = require("../../utils/userManagement/service.util");
const userAccess = require("../../middleware/accessChecker");

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
router.get("/", async (req, res) => {
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
    if (search !== undefined && search !== "") {
      if (filter !== undefined && filter !== "All") {
        /* Finding all the admins in the database. */
        users = await User.find({
          name: { $regex: search, $options: "i" },
          userType: filter,
        });
      } else {
        /* Finding all the admins in the database. */
        users = await User.find({
          name: { $regex: search, $options: "i" },
        });
      }
      total = users.length;
    } else if (filter !== undefined && filter !== "All") {
      /* Finding all the admins in the database. */
      users = await User.find({
        userType: filter,
      });
      total = users.length;
    } else {
      /* Finding all the admins in the database. */
      users = await User.find()
        .skip((page - 1) * size)
        .limit(size)
        .exec();

      /* count total users in the database. */
      total = await User.countDocuments();
      totalPage = parseInt(total / size + 1);
    }
    /* Sending the users object to the client. */
    res.json({ users: users, total: total, totalPage: totalPage });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the / route. It is used to get all the users. */
router.get("/get-count", userAccess, async (req, res) => {
  try {
    total = await User.countDocuments();
    /* Sending the users object to the client. */
    res.json({ total: total });
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

/* This is a route handler for the update route. It is updating the user account. */
router.put("/update", userAccess, async (req, res) => {
  try {
    /* Updating the user account. */
    await User.findByIdAndUpdate(req.body.user._id, req.body).exec();

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

    // hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(validated.password, salt);

    var id = Math.random().toString(8).substring(5, 15);
    id = "E" + id;
    // save a new user account to the db
    const newUser = new User({
      id: id,
      name: validated.name,
      email: validated.email,
      mobile: validated.mobile,
      age: validated.age,
      sex: validated.sex,
      userType: validated.userType,
      address: validated.address,
      passwordHash: hashedPassword,
    });
    /* Saving the new user to the database. */
    await newUser.save();

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
router.put("/update/admin/:id", userAccess, async (req, res) => {
  try {
    const id = req.params.id;

    /* Calling the function updateAdmin from functions.util.js and passing the validated id and validated
object. */
    await User.findByIdAndUpdate(id, req.body);

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
