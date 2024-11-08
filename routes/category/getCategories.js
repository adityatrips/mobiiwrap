const Category = require("../../models/Category");

const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    return res.status(200).json(categories);
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = getCategories;
