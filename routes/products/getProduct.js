const { validationResult } = require("express-validator");
const Product = require("../../models/Product");

const getProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const products = await Product.findOne({
      slug: id,
    }).populate("category");

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = getProduct;
