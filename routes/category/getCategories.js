const Category = require("../../models/Category");

const getCategories = async (req, res) => {
  const categories = await Category.find({});

  return res.status(200).json(categories, { status: 200 });
};

module.exports = getCategories;
