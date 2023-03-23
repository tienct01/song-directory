const express = require("express");
const { authCheck, logout } = require("../controllers/auth.controller.js");
const router = express.Router();

router.get("/auth", authCheck);
router.get("/logout", logout);

module.exports = router;
