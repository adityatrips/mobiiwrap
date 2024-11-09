const crypto = require("crypto");
const Razorpay = require("razorpay");

const createOrder = async (req, res) => {
  const rzpInstance = new Razorpay({
    key_id: process.env.RZP_TEST_KEY_ID,
    key_secret: process.env.RZP_TEST_KEY_SECRET,
  });

  const { amount } = req.body;

  try {
    const order = await rzpInstance.orders.create({
      amount,
      currency: "INR",
      receipt: crypto.randomBytes(16).toString("hex"),
    });
    return res.status(201).json(order);
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = createOrder;
