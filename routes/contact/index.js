const { Router } = require("express");
const router = Router();

const QueryForm = require("../../models/QueryForm");
const { validationResult, body } = require("express-validator");

const submitQuery = async (req, res) => {
  const result = validationResult(req);

  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  try {
    const { name, email, phone, message } = req.body;

    const queryForm = new QueryForm({
      name,
      email,
      phone,
      message,
    });

    await queryForm.save();

    return res
      .status(201)
      .json({ message: "Query form submitted successfully" });
  } catch (error) {
    return res.status(500).json({
      message: "Server error",
    });
  }
};

router.post(
  "/",
  body("name").notEmpty().isString(),
  body("email").notEmpty().isEmail(),
  body("phone").notEmpty().isString(),
  body("message").notEmpty().isString(),
  submitQuery
);

module.exports = router;
