const { Router } = require("express");
const router = Router();

const createOrder = require("./createOrder");
const verifyOrder = require("./verifyOrder");

router.post("/", createOrder);
router.post("/verify", verifyOrder);

module.exports = router;
