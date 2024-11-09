const Product = require("../../models/Product");

const getFeaturedProducts = async (req, res) => {
  try {
    const products = await Product.find({
      featured: true,
    });

    return res.json({
      products,
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = getFeaturedProducts;
