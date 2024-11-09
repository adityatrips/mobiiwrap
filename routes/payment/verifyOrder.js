const crypto = require("crypto");

const verifyOrder = async (req, res) => {
  try {
    const { razorpay_orderID, razorpay_paymentID, razorpay_signature } =
      req.body;
    const sign = razorpay_orderID + "|" + razorpay_paymentID;
    const resultSign = crypto
      .createHmac("sha256", process.env.KEY_SECRET)
      .update(sign.toString())
      .digest("hex");

    if (razorpay_signature == resultSign) {
      return res
        .status(200)
        .json({ success: true, message: "Payment verified successfully" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error!" });
  }
};

module.exports = verifyOrder;
