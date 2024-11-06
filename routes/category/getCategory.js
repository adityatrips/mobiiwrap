const Category = require("../../models/Category");

const getCategory = async (req, res) => {
  const { categoryId } = req.params;

  const category = await Category.findById(categoryId);
  return res.status(200).json(category, { status: 200 });
};

module.exports = getCategory;
