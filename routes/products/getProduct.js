const Product = require("../../models/Product");

const getProduct = async (req, res) => {
  const products = await Product.findOne({
    slug: params.prod,
  }).populate("category");

  return res.status(200).json(products);
};

module.exports = getProduct;
