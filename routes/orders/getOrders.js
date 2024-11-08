const { validationResult } = require("express-validator");
const Orders = require("../../models/Orders");

const getOrders = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const orders = await Orders.find().populate(
      "products.product",
      "name price image"
    );
    return res.status(200).json(orders);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = getOrders;
