const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
	studentSignIn,
	studentSignUp,
	verifyOtp,
	resendOtp,
	googleAuth,
} = require("../controllers/authController");

authRouter
	.post("/signin", studentSignIn)
	.post("/signup", studentSignUp)
	.post("/verify-otp", verifyOtp)
	.post("/resend-otp", resendOtp)
	.post("/google", googleAuth);

// .post("/admin/signin", adminSignIn);

module.exports = authRouter;
