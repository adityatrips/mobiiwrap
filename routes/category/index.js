const { Router } = require("express");
const router = Router();

const getCategory = require("./getCategory");
const createCategory = require("./getCategories");
const { query } = require("express-validator");

router.get("/", createCategory);
router.get("/:categoryId", query("categoryId").notEmpty(), getCategory);

module.exports = router;
