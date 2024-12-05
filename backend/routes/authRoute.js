const express = require("express");
const authRouter = express.Router();
const jwt = require("jsonwebtoken");
const {
	studentSignIn,
	studentSignUp,
	verifyOtp,
	resendOtp,
	googleAuth,
	forgotPassword,
	resetPassword,
	tutorSignUp,
	tutorSignIn,
	adminSignIn,
	refreshAccessToken,
	userLogout
} = require("../controllers/authController");

authRouter
	.post("/signin", studentSignIn)
	.post("/signup", studentSignUp)
	.post("/verify-otp", verifyOtp)
	.post("/resend-otp", resendOtp)
	.post("/google", googleAuth)
	.post("/forgot-password", forgotPassword)
	.post("/reset-password/:token", resetPassword)

	.post("/tutor/signin", tutorSignIn)
	.post("/tutor/signup", tutorSignUp)

	.post("/admin/signin", adminSignIn)
	
	.post("/refresh-token", refreshAccessToken)
	.post("/logout", userLogout)

module.exports = authRouter;
