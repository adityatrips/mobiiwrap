const Product = require("../../models/Product");
const logger = require("../../utils/logger");

const getFeaturedProducts = async (req, res) => {
  // try {
  logger.success(products);
  const products = await Product.find({
    featured: true,
  });

  return res.json({
    products,
  });
  // } catch (error) {
  //   return res.status(500).json({ message: "Server error" });
  // }
};

module.exports = getFeaturedProducts;
