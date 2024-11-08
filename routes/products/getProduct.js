const { validationResult } = require("express-validator");
const Product = require("../../models/Product");

const getProduct = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    console.log(result.array());
    return res.status(400).json({ errors: result.array() });
  }

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
