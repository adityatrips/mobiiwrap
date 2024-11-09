const { Router } = require("express");
const router = Router();

const login = require("./login");
const register = require("./register");

router.post("/login", login);
router.post("/register", register);

module.exports = router;
