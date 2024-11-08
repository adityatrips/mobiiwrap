const { validationResult } = require("express-validator");
const Category = require("../../models/Category");

const getCategory = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const { categoryId } = req.params;

    const category = await Category.findById(categoryId);
    return res.status(200).json(category, { status: 200 });
  } catch (error) {
    return res.status(500).json({ error: "Server error" });
  }
};

module.exports = getCategory;
