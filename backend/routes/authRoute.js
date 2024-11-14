const express = require("express");
const {
	studentSignIn,
	studentSignUp,
   verifyOtp,
   resendOtp
} = require("../controllers/authController");

const authRouter = express.Router();

authRouter
	.post("/signin", studentSignIn)
	.post("/signup", studentSignUp)
	.post("/verify-otp", verifyOtp)
	.post("/resend-otp", resendOtp)
// .post("/admin/signin", adminSignIn);

module.exports = authRouter;
