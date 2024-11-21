//* ====== Import Required Models ====== *//
const UnverifiedUser = require("../models/unverifiedUserModel");
const Student = require("../models/studentModel");
const Tutor = require("../models/tutorModel");
const Admin = require("../models/adminModel");

//* ====== Import Modules and Functions ====== *//
const jwt = require("jsonwebtoken");
const { hashPassword, comparePassword } = require("../utils/passwordUtils");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const { sendOTPEmail, sendPasswordResetEmail } = require("../utils/emailUtils");
const { OAuth2Client } = require("google-auth-library");
const chalk = require("chalk");
dotenv.config();

const FRONTEND_URL = process.env.CLIENT_URL;
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

		const isTutorExists = await Tutor.findOne({
			$or: [{ email }, { user_name }, { phone }],
		});

		const isUserVerified = await Student.findOne({
			$or: [{ email }, { user_name }, { phone }],
		});
		const isUserExists = await UnverifiedUser.findOne({
			$or: [{ email }, { user_name }, { phone }],
		});

		if (isUserExists || isUserVerified || isTutorExists) {
			return res.status(400).json({ message: "User already exists" });
		}
		const hashedPassword = await hashPassword(password);

		const otp = generateOTP();
		console.log(chalk.green(`OTP:${chalk.yellow(otp)} `));

		const otpExpiry = Date.now() + 60000;

		const unverifiedStudent = new UnverifiedUser({
			full_name,
			user_name,
			email,
			phone,
			password: hashedPassword,
			otp,
			otpExpiry,
			role: "student",
		});

		await unverifiedStudent.save();

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
		const isTutorAccount = await Tutor.findOne({
			$or: [{ email }, { user_name: email }],
		});
		if (isTutorAccount) {
			return res
			.status(400)
			.json({ message: "This account is a tutor account" });
		}
		
		const isUserUnverified = await UnverifiedUser.findOne({
			$or: [{ email }, { user_name: email }],
		});

		if (isUserUnverified && isUserUnverified.role !== "student") {
			return res
			.status(400)
			.json({ message: "This account is a tutor account" });
		}
		if (isUserUnverified) {
			return res
				.status(403)
				.json({ not_verified: true, message: "Verify your email" });
		}
		

		if (!student && !isUserUnverified) {
			return res.status(400).json({ message: "Account not found" });
		}
		if (student.is_blocked) {
			return res.status(401).json({
				message:
					"Your account has been blocked. Please contact the support team.",
			});
		}

		const isMatch = await comparePassword(password, student?.password);

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
			studentData: studentDetails,
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

		let userData;
		if (unverifiedUser.role === "student") {
			userData = new Student({
				full_name: unverifiedUser.full_name,
				user_name: unverifiedUser.user_name,
				email: unverifiedUser.email,
				phone: unverifiedUser.phone,
				password: unverifiedUser.password,
				is_verified: true,
			});
			await userData.save();
		} else if (unverifiedUser.role === "tutor") {
			userData = new Tutor({
				full_name: unverifiedUser.full_name,
				user_name: unverifiedUser.user_name,
				email: unverifiedUser.email,
				phone: unverifiedUser.phone,
				password: unverifiedUser.password,
				is_verified: true,
			});
			await userData.save();
		}

		const { password: _, ...otherDetails } = userData.toObject();

		const token = createToken(userData._id);

		await UnverifiedUser.deleteOne({ email });

		res.status(200).json({
			message: "Email verified successfully.",
			userData: otherDetails,
			token: token,
		});
	} catch (error) {
		console.log("OTP Verification Error: ", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const resendOtp = async (req, res) => {
	try {
		const { email, role } = req.body;
		const unverifiedUser = await UnverifiedUser.findOne({ email });

		if (!unverifiedUser) {
			return res
				.status(404)
				.json({ success: false, message: "User not found." });
		}

		if(unverifiedUser.role !== role && role === "student") {
			return res.status(400).json({message: "This is a Tutor Account"})
		} else if (unverifiedUser.role !== role && role === "tutor") {
			return res.status(400).json({message: "This is a Student Account"})
		}

		const remainingTime = unverifiedUser.otpExpiry - Date.now();

		if (remainingTime <= 5000) {
			unverifiedUser.otp = generateOTP();
			unverifiedUser.otpExpiry = new Date(Date.now() + 120000);
		}
		await unverifiedUser.save();
		console.log(
			chalk.greenBright(
				`Resent OTP:${chalk.yellowBright(unverifiedUser.otp)} `
			)
		);

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

const googleAuth = async (req, res) => {
	const { token, role } = req.body;

	if (!token || !role) {
		return res.status(400).json({ error: "Token and role are required" });
	}

	if (!["student", "tutor"].includes(role)) {
		return res.status(400).json({ error: "Invalid role specified" });
	}

	try {
		const client = new OAuth2Client({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		});

		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: process.env.GOOGLE_CLIENT_ID,
		});

		const payload = ticket.getPayload();

		if (!payload.email_verified) {
			console.log("Unverified email: ", payload.email);
			return res.status(401).json({ message: "Email not verified" });
		}

		const { name, email, sub, picture } = payload;

		const isOtherRoleExists = await (async () => {
			if (role === "student") {
				return await Tutor.findOne({ email });
			} else if (role === "tutor") {
				return await Student.findOne({ email });
			}
			return false;
		})();

		if (isOtherRoleExists) {
			return res.status(401).json({
				message: `This account is a ${
					role === "student" ? "Tutor" : "Student"
				} account.`,
			});
		}

		const User = role === "student" ? Student : Tutor;

		let user = await User.findOne({ email });

		if (user && user.is_blocked) {
			return res.status(401).json({
				message:
					"Your account has been blocked. Please contact the support team.",
			});
		}

		if (!user) {
			user = new User({
				full_name: name,
				email,
				google_id: sub,
				avatar: picture,
			});
		} else if (!user.google_id) {
			user.google_id = sub;
			if (!user.avatar) {
				user.avatar = picture;
			}
		}
		await user.save();

		const userToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "1d",
		});

		const { password, ...userDetails } = user.toObject();

		return res
			.status(200)
			.json({ token: userToken, userData: userDetails });
	} catch (error) {
		console.error("Google Auth Error: ", error.stack || error);
		res.status(500).json({
			message: "Internal server error. Please try again.",
		});
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email, role } = req.body;
		console.log(req.body);

		let user;

		if (role === "student") {
			user = await Student.findOne({ email });
			if (!user) {
				return res.status(404).json({ message: "User not found." });
			}
		} else if (role === "tutor") {
			user = await Tutor.findOne({ email });
			if (!user) {
				return res.status(404).json({ message: "User not found." });
			}
		} else {
			return res.status(400).json({ error: "No roles Found." });
		}

		const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
			expiresIn: "15m",
		});

		user.resetToken = token;
		user.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

		await user.save();

		const link = `${FRONTEND_URL}/reset-password/${token}?name=${encodeURIComponent(
			user.full_name
		)}&role=${role}`;
		await sendPasswordResetEmail(email, link);

		return res.status(200).json({ message: "Email sent successfully." });
	} catch (error) {
		console.error("Forgot Password Error: ", error);
		return res.status(500).json({ message: "Something went wrong." });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const role = req.query.role;
		const { newPassword, confirmPassword } = req.body;
		console.log(newPassword, req.query);
		if (newPassword !== confirmPassword) {
			return res.status(400).json({ message: "Password does not match" });
		}
		let user;

		if (role === "student") {
			user = await Student.findOne({
				resetToken: token,
				resetTokenExpiry: { $gt: Date.now() },
			});
		} else if (role === "tutor") {
			user = await Tutor.findOne({
				resetToken: token,
				resetTokenExpiry: { $gt: Date.now() },
			});
		}
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid or expired token." });
		}
		const oldPassword = await comparePassword(
			newPassword,
			user?.password || ""
		);
		if (oldPassword) {
			return res
				.status(400)
				.json({ message: "Password cannot be same as old password" });
		}

		const hashedPassword = await hashPassword(newPassword);

		user.password = hashedPassword;
		user.resetToken = undefined;
		user.resetTokenExpiry = undefined;
		await user.save();
		return res
			.status(200)
			.json({ message: "Password reset successfully." });
	} catch (error) {
		res.status(500).json({ message: error });
		console.log("Reset password Error: ", error);
	}
};

const tutorSignUp = async (req, res) => {
	try {
		const { full_name, user_name, email, phone, password } = req.body;

		const isUserVerified = await Tutor.findOne({
			$or: [{ email }, { user_name }, { phone }],
		});
		const isStudentExists = await Student.findOne({ email });
		const isUserExists = await UnverifiedUser.findOne({
			$or: [{ email }, { user_name }, { phone }],
		});

		if (isUserVerified || isStudentExists || isUserExists) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await hashPassword(password);

		const otp = generateOTP();
		console.log(chalk.greenBright(`OTP:${chalk.yellowBright(otp)} `));

		const otpExpiry = Date.now() + 60000;

		const unverifiedTutor = new UnverifiedUser({
			full_name,
			user_name,
			email,
			phone,
			password: hashedPassword,
			otp,
			otpExpiry,
			role: "tutor",
		});

		await unverifiedTutor.save();

		await sendOTPEmail(email, otp);

		return res.status(201).json({
			message: "OTP sent to your email.",
		});
	} catch (error) {
		console.log("Tutor SignUp Error: ", error);
		res.status(500).json({ message: "Something went wrong" });
	}
};

const tutorSignIn = async (req, res) => {
	try {
		const { email, password, remember } = req.body;

		const tutor = await Tutor.findOne({
			$or: [{ email }, { user_name: email }],
		});

		const isStudent = await Student.findOne({
			$or: [{ email }, { user_name: email }],
		});

		if (isStudent) {
			return res
				.status(400)
				.json({ message: "This account is a student account" });
		}

		const isUserUnverified = await UnverifiedUser.findOne({
			$or: [{ email }, { user_name: email }],
		});
		if (isUserUnverified && isUserUnverified.role !== "tutor") {
			return res
			.status(400)
			.json({ message: "This account is a student account" });
		}

		if (isUserUnverified) {
			return res
				.status(403)
				.json({ not_verified: true, message: "Verify your email" });
		}
		if (!tutor && !isUserUnverified) {
			return res.status(400).json({ message: "Account not found" });
		}
		if (tutor.is_blocked) {
			return res.status(401).json({
				message:
					"Your account has been blocked. Please contact the support team.",
			});
		}


		const isMatch = await comparePassword(password, tutor?.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Incorrect Password" });
		}

		const token = jwt.sign({ id: tutor._id }, JWT_SECRET, {
			expiresIn: remember ? "7d" : "1d",
		});

		const { password: _, ...tutorDetails } = tutor.toObject();

		res.status(200).json({
			message: "Tutor logged in successfully",
			token,
			tutorData: tutorDetails,
		});
	} catch (error) {
		console.log("SignIn Error: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const adminSignIn = async (req, res) => {
	const { email, password } = req.body;
	try {
		const admin = await Admin.findOne({
			$or: [{ email }, { user_name: email }],
		});
		if (!admin) {
			return res.status(400).json({ message: "Account not found" });
		}

		const isMatch = await comparePassword(password, admin?.password);

		if (!isMatch) {
			return res.status(400).json({ message: "Incorrect Password" });
		}

		const token = jwt.sign({ id: admin._id }, JWT_SECRET, {
			expiresIn: "1d",
		});

		const { password: _, ...adminDetails } = admin.toObject();

		res.status(200).json({
			message: "Admin logged in successfully",
			token,
			adminData: adminDetails,
		});
	} catch (error) {
		console.log("Admin Sign In Error: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

module.exports = {
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
};
