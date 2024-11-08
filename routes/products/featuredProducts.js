const { validationResult } = require("express-validator");
const Product = require("../../models/Product");

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({ featured: true });

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = getFeaturedProducts;
