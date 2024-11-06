const { Router } = require("express");
const router = Router();

const getCategory = require("./getCategory");
const createCategory = require("./getCategories");

router.get("/", createCategory);
router.get("/:categoryId", getCategory);

module.exports = router;
