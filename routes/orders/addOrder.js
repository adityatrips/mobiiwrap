const Orders = require("../../models/Orders");

const addOrder = async (req, res) => {
  try {
    const { products, userId, address, phone, pincode, total } = req.body;

    const order = new Orders({
      user: userId,
      products,
      address,
      phone,
      pincode,
      total,
    });

    await order.save();

    return res.status(201).json({
      message: "Order placed successfully",
      id: order._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

module.exports = addOrder;
