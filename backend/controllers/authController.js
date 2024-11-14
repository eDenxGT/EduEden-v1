const Student = require("../models/studentModel");
const UnverifiedUser = require("../models/unVerifiedUserModel");
const jwt = require("jsonwebtoken");
const hashPassword = require("../utils/hashPassword");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { sendOTPEmail } = require("../utils/emailUtils");
dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const createToken = (id) => {
	return jwt.sign({ id }, JWT_SECRET, { expiresIn: "1d" });
};

const generateOTP = () => {
	return Math.floor(100000 + Math.random() * 900000).toString();
};

const studentSignUp = async (req, res) => {
	try {
		const { full_name, user_name, email, phone, password } = req.body;

		const isUserExists = await UnverifiedUser.findOne({
			user_name,
			email,
			phone,
		});
		const isUserVerified = await Student.findOne({
			user_name,
			email,
			phone,
		});
		if (isUserExists || isUserVerified) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await hashPassword(password);

		const otp = generateOTP();
		console.log(otp);

		const otpExpiry = Date.now() + 60000;

		const unverifiedUser = new UnverifiedUser({
			full_name,
			user_name,
			email,
			phone,
			password: hashedPassword,
			otp,
			otpExpiry,
		});

		await unverifiedUser.save();

		await sendOTPEmail(email, otp);

		return res.status(201).json({
			message: "OTP sent to your email.",
		});
	} catch (error) {
		console.log("SignUp Error: ", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const studentSignIn = async (req, res) => {
	try {
		const { email, password, remember } = req.body;
		const student = await Student.findOne({
			$or: [{ email }, { user_name: email }],
		});

		const isUserUnverified = await UnverifiedUser.findOne({
			$or: [{ email }, { user_name: email }],
		});

		if (isUserUnverified) {
			return res.status(403).json({ verified:false, message: "Verify your email" });
		}

		if (!student && !isUserUnverified) {
			return res.status(400).json({ message: "Account not found" });
		}

		const isMatch = await bcrypt.compare(password, student.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Incorrect Password" });
		}

		const token = jwt.sign({ id: student._id }, JWT_SECRET, {
			expiresIn: remember ? "7d" : "1d",
		});

		const { password: _, ...studentDetails } = student.toObject();

		res.status(200).json({
			message: "Student logged in successfully",
			token,
			student: studentDetails,
		});
	} catch (error) {
		console.log("SignIn Error: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const verifyOtp = async (req, res) => {
	try {
		const { email, otp } = req.body;

		const unverifiedUser = await UnverifiedUser.findOne({ email });

		if (!unverifiedUser) {
			return res.status(400).json({ message: "User not found." });
		}

		if (unverifiedUser.otp != otp) {
			return res.status(400).json({ message: "Invalid OTP" });
		}

		if (Date.now() > unverifiedUser.otpExpiry) {
			return res.status(400).json({ message: "OTP has expired" });
		}

		const student = new Student({
			full_name: unverifiedUser.full_name,
			user_name: unverifiedUser.user_name,
			email: unverifiedUser.email,
			phone: unverifiedUser.phone,
			password: unverifiedUser.password,
			is_verified: true,
		});

		await student.save();

		await UnverifiedUser.deleteOne({ email });

		res.status(200).json({
			message: "Email verified successfully.",
		});
	} catch (error) {
		console.log("OTP Verification Error: ", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const resendOtp = async (req, res) => {
	try {
		const { email } = req.body;
		const unverifiedUser = await UnverifiedUser.findOne({ email });

		if (!unverifiedUser) {
			return res
				.status(404)
				.json({ success: false, message: "User not found." });
		}

		const remainingTime = unverifiedUser.otpExpiry - Date.now();

		if (remainingTime <= 5000) {
		  unverifiedUser.otp = generateOTP();
		  unverifiedUser.otpExpiry = new Date(Date.now() + 120000);
		}
		await unverifiedUser.save();
		console.log( unverifiedUser.otp);

		await sendOTPEmail(email, unverifiedUser.otp);

		return res.status(200).json({
			success: true,
			message: "OTP resent successfully.",
		});
	} catch (error) {
		console.log("OTP Resent error: ", error.message);
		return res.status(500).json({
			success: false,
			message: "Internal server error while resending OTP.",
		});
	}
};

module.exports = {
	studentSignIn,
	studentSignUp,
	verifyOtp,
	resendOtp,
};
