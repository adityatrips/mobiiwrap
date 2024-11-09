const { Router } = require("express");
const router = Router();
const logger = require("../../utils/logger");

const Product = require("../../models/Product");
const { validationResult, body, query } = require("express-validator");

const feelingLucky = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    let { qty } = req.query;

    qty = parseInt(qty || "1");

    const products = await Product.aggregate().sample(qty);

    return res.status(200).json({
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

router.get("/", query("qty").notEmpty(), feelingLucky);

module.exports = router;
