const { validationResult } = require("express-validator");
const Orders = require("../../models/Orders");

const addOrder = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
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
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = addOrder;
