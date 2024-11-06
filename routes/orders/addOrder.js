const Orders = require("../../models/Orders");

const addOrder = async (req, res) => {
  const {
    products,
    userId,
    address,
    phone,
    pincode,
    payment,
    total,
    paymentProof,
  } = req.body;

  const order = new Orders({
    user: userId,
    products,
    address,
    phone,
    pincode,
    payment,
    paymentProof,
    total,
  });

  await order.save();

  return res.status(201).json({
    message: "Order placed successfully",
    id: order._id,
  });
};

module.exports = addOrder;
