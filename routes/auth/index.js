const { Router } = require("express");
const router = Router();

const login = require("./login");
const register = require("./register");
const { body } = require("express-validator");

router.post(
  "/login",
  body("email")
    .notEmpty()
    .withMessage("Email is required to login")
    .isEmail()
    .withMessage("Email is not valid")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("Password is required to login")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long")
    .trim(),
  login
);
router.post(
  "/register",
  body("email")
    .notEmpty()
    .withMessage("Email can not be empty")
    .isEmail()
    .withMessage("Email is not valid. Please provide a valid email address")
    .trim(),
  body("password")
    .notEmpty()
    .withMessage("Password can not be empty. Please provide a password")
    .isLength({ min: 8, max: 32 })
    .withMessage("Password must be between 8 and 32 characters long")
    .trim(),
  body("name")
    .notEmpty()
    .withMessage("Name can not be empty. Please provide a name")
    .isLength({ min: 3 })
    .withMessage("Name must be at least 3 characters long")
    .trim(),
  register
);

module.exports = router;
