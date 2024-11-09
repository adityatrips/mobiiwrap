const User = require("../../models/User");
const Cart = require("../../models/Cart");

const register = async (req, res) => {
  try {
    console.log("SignUp initiated");
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
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = register;
