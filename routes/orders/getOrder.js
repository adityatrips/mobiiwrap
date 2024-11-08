const { validationResult } = require("express-validator");
const Orders = require("../../models/Orders");

const getOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Orders.findById(id).populate(
      "products.product",
      "name price image"
    );
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = getOrder;
