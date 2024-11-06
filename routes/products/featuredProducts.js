const Product = require("../../models/Product");

const getFeaturedProducts = async (req, res) => {
  const products = await Product.find({ featured: true });

  return res.status(200).json({
    products,
  });
};

module.exports = getFeaturedProducts;
