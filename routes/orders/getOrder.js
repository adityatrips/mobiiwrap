const Orders = require("../../models/Orders");

const getOrder = async (req, res) => {
  const { id } = req.params;

  const order = await Orders.findById(id).populate(
    "products.product",
    "name price image"
  );
  if (!order) {
    return res.status(404).json({ message: "Order not found" });
  }
  return res.status(200).json(order);
};

module.exports = getOrder;
