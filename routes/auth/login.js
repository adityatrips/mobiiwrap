const { validationResult } = require("express-validator");
const User = require("../../models/User");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
  try {
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({
        errors: result.array(),
      });
    }

    const { email, password } = req.body;

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isMatch = bcrypt.compareSync(password, user._doc.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = user.generateJWT();

    return res.status(200).json({
      token,
      ...user._doc,
    });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = login;
