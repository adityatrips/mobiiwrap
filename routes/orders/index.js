const { Router } = require("express");
const router = Router();

const getOrder = require("./getOrder");
const addOrder = require("./addOrder");
const getOrders = require("./getOrders");

router.get("/", getOrders);
router.get("/:id", getOrder);
router.post("/", addOrder);

module.exports = router;
