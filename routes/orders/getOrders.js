const Orders = require("../../models/Orders");

const getOrders = async (req, res) => {
  const orders = await Orders.find().populate(
    "products.product",
    "name price image"
  );
  return res.status(200).json(orders);
};

module.exports = getOrders;
