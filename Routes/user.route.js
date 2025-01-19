const { registerUser, loginUser, logoutUser } = require("../conttoller/user.controller");
const express = require("express");
const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser); 

module.exports = router;
