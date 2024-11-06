const User = require("../../models/User");
const Cart = require("../../models/Cart");
const { validationResult } = require("express-validator");

const register = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({
      errors: result.array(),
    });
  }

  const { email, password, name } = req.body;

  const newUser = new User({
    name,
    email,
    password,
  });

  await newUser.save();

  const token = newUser.generateJWT();

  const newCart = new Cart({
    user: newUser._id,
    products: [],
    totalItems: 0,
    total: 0,
  });

  await newCart.save();

  return res.json({
    token,
  });
};

module.exports = register;
