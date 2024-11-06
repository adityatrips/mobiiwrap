const { Router } = require("express");
const router = Router();

const QueryForm = require("../../models/QueryForm");

const submitQuery = async (req, res) => {
  const { name, email, phone, message } = req.body;

  const queryForm = new QueryForm({
    name,
    email,
    phone,
    message,
  });

  await queryForm.save();

  return res.status(201).json({ message: "Query form submitted successfully" });
};

router.post("/", submitQuery);

module.exports = router;
