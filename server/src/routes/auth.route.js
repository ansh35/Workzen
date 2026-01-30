const express = require("express");
const { register, login ,forgotPassword,
    resetPassword } = require("../controllers/auth.js");

 const router = express.Router();

 // REGISTER ROUTE
 router.post("/register", register);

 // LOGIN ROUTE
 router.post("/login", login);

 //  forgot password
console.log("forgotPassword:", forgotPassword);
router.post("/forgot-password", forgotPassword);

// reset password
console.log("resetPassword:", resetPassword);
router.post("/reset-password/:token", resetPassword);

 module.exports = router;