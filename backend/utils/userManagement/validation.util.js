const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

/* A schema for validating the user registration form. */
const supplierRegisterSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  mobile: Joi.string()
    .allow("")
    .length(10)
    .pattern(/^[0-9]+$/)
    .label("Mobile"),
  address: Joi.string().required().label("Address"),
  userType: Joi.string()
    .valid("Manager", "Site Manager", "Accountant", "Supplier")
    .required()
    .label("userType"),
  password: passwordComplexity().required().label("Password"),
});

/* A schema for validating the user update form. */
const userUpdateSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  mobile: Joi.string()
    .allow("")
    .length(10)
    .pattern(/^[0-9]+$/)
    .label("Mobile"),
  age: Joi.string().length(10).required().label("Age"),
  sex: Joi.string().required().label("Sex"),
  userType: Joi.string()
    .valid("Manager", "Site Manager", "Accountant", "Supplier")
    .required()
    .label("userType"),
}).unknown(true);

/* This is a schema for validating the login form. */
const loginSchema = Joi.object({
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  password: Joi.string().required().label("Password"),
});

/* A schema for validating the admin registration form. */
const createUserSchema = Joi.object({
  name: Joi.string().min(2).max(30).required().label("Name"),
  email: Joi.string()
    .min(5)
    .max(255)
    .required()
    .email()
    .rule({ message: "Invalid E-mail address" })
    .label("E-mail"),
  mobile: Joi.string()
    .allow("")
    .length(10)
    .pattern(/^[0-9]+$/)
    .label("Mobile"),
  age: Joi.string().length(2).required().label("Age"),
  sex: Joi.string().required().label("Sex"),
  userType: Joi.string()
    .valid("Manager", "Site Manager", "Accountant", "Supplier")
    .required()
    .label("userType"),
  address: Joi.string().required().label("Address"),
  password: passwordComplexity().required().label("Password"),
}).unknown(true);

module.exports = {
  supplierRegisterSchema,
  userUpdateSchema,
  loginSchema,
  createUserSchema,
};
