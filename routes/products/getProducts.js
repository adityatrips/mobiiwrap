const Category = require("../../models/Product");
const Product = require("../../models/Product");

const getProduct = async (req, res) => {
  let { page, limit, search, minPrice, maxPrice, category, rating, sort } =
    req.query;

  await Category.find();

  page = parseInt(page || "1");
  limit = parseInt(limit || "10");
  skip = (page - 1) * limit;

  search = search || "";
  minPrice = parseFloat(minPrice);
  maxPrice = parseFloat(maxPrice);
  category = category;
  rating = parseInt(rating);
  sort = sort;

  const filter = {};

  if (search) {
    filter.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  if (!isNaN(minPrice) && !isNaN(maxPrice)) {
    filter.price = { $gte: minPrice, $lte: maxPrice };
  } else if (!isNaN(minPrice)) {
    filter.price = { $gte: minPrice };
  } else if (!isNaN(maxPrice)) {
    filter.price = { $lte: maxPrice };
  }

  if (category) {
    filter.category = category;
  }

  if (!isNaN(rating)) {
    filter.rating = { $gte: rating };
  }

  let sortOptions = { name: 1 };
  if (sort) {
    const [field, order] = sort.split("_");
    sortOptions = { [field]: order === "asc" ? 1 : -1 };
  }

  const products = await Product.find(filter)
    .skip(skip)
    .limit(limit)
    .sort(sortOptions)
    .populate("category")
    .lean();

  const totalRecords = await Product.countDocuments(filter);
  const totalPages = Math.ceil(totalRecords / limit);

  const response = {
    products,
    page,
    totalPages,
    totalRecords,
  };

  return res.status(200).json(response);
};

module.exports = getProduct;
