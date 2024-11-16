const UnverifiedUser = require("../models/unverifiedUserModel");
const Student = require("../models/studentModel");
const Tutor = require("../models/tutorModel");

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
		if (isUserUnverified) {
			return res
				.status(403)
				.json({ verified: false, message: "Verify your email" });
		}

		if (!student && !isUserUnverified) {
			return res.status(400).json({ message: "Account not found" });
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
			student: studentDetails,
		});
	} catch (error) {
		console.log("SignIn Error: ", error);
		res.status(500).json({ message: "Internal server error" });
	}
};

const verifyOtp = async (req, res) => {
	try {
		const { email, otp, role } = req.body;

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
		if (unverifiedUser.role === "student") {
			const student = new Student({
				full_name: unverifiedUser.full_name,
				user_name: unverifiedUser.user_name,
				email: unverifiedUser.email,
				phone: unverifiedUser.phone,
				password: unverifiedUser.password,
				is_verified: true,
			});
			await student.save();
		} else if (unverifiedUser.role === "tutor") {
			const tutor = new Tutor({
				full_name: unverifiedUser.full_name,
				user_name: unverifiedUser.user_name,
				email: unverifiedUser.email,
				phone: unverifiedUser.phone,
				password: unverifiedUser.password,
				is_verified: true,
			});
			await tutor.save();
		}

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
			return res.status(401).json({ message: "Email not verified" });
		}

		let user;
		if (role === "student") {
			const isTutorExists = await Tutor.findOne({ email: payload.email });
			if (isTutorExists) {
				return res
					.status(401)
					.json({ message: "Tutor account already exists" });
			}
			user = await Student.findOne({ email: payload.email });
			if (!user) {
				user = new Student({
					full_name: payload.name,
					email: payload.email,
					google_id: payload.sub,
					avatar: payload.picture,
				});
				await user.save();
			} else if (!user.google_id) {
				user.google_id = payload.sub;
				if (!user.avatar) {
					user.avatar = payload.picture;
				}
				await user.save();
			}
		} else if (role === "tutor") {
			const isStudentExists = await Student.findOne({
				email: payload.email,
			});

			if (isStudentExists) {
				return res
					.status(401)
					.json({ message: "Student account already exists" });
			}
			user = await Tutor.findOne({ email: payload.email });
			if (!user) {
				user = new Tutor({
					full_name: payload.name,
					email: payload.email,
					google_id: payload.sub,
					avatar: payload.picture,
				});
				await user.save();
			} else if (!user.google_id) {
				user.google_id = payload.sub;
				if (!user.avatar) {
					user.avatar = payload.picture;
				}
				await user.save();
			}
		}

		const userToken = jwt.sign(
			{
				id: user._id,
			},
			JWT_SECRET,
			{ expiresIn: "1h" }
		);

		const { password: _, ...userDetails } = user.toObject();

		return res
			.status(200)
			.json({ token: userToken, userData: userDetails });
	} catch (error) {
		res.status(401).json({ message: error.message });
		console.log("Google Auth Error: ", error);
	}
};

const forgotPassword = async (req, res) => {
	try {
		const { email } = req.body;
		console.log(email);

		const student = await Student.findOne({ email });
		if (!student) {
			return res.status(404).json({ message: "User not found." });
		}
		const token = jwt.sign({ id: student._id }, JWT_SECRET, {
			expiresIn: "15m",
		});
		student.resetToken = token;
		student.resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000);

		await student.save();

		const link = `${FRONTEND_URL}/reset-password/${token}?name=${student.full_name}`;
		await sendPasswordResetEmail(email, link);
		return res.status(200).json({ message: "Email sent successfully." });
	} catch (error) {
		console.log("Forgot Password Error: ", error);
		return res.status(500).json({ message: "Something went wrong." });
	}
};

const resetPassword = async (req, res) => {
	try {
		const { token } = req.params;
		const { newPassword, confirmPassword } = req.body;
		console.log(newPassword, confirmPassword);
		if (newPassword !== confirmPassword) {
			return res.status(400).json({ message: "Password does not match" });
		}

		const student = await Student.findOne({
			resetToken: token,
			resetTokenExpiry: { $gt: Date.now() },
		});
		if (!student) {
			return res
				.status(400)
				.json({ message: "Invalid or expired token." });
		}
		const oldPassword = await comparePassword(
			newPassword,
			student?.password || ""
		);
		if (oldPassword) {
			return res
				.status(400)
				.json({ message: "Password cannot be same as old password" });
		}

		const hashedPassword = await hashPassword(newPassword);

		student.password = hashedPassword;
		student.resetToken = undefined;
		student.resetTokenExpiry = undefined;
		await student.save();
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
		const { full_name, user_name, email, phone, password, job_title, bio } =
			req.body;

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

		if (isUserUnverified) {
			return res
				.status(403)
				.json({ verified: false, message: "Verify your email" });
		}

		if (!tutor && !isUserUnverified) {
			return res.status(400).json({ message: "Account not found" });
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
			tutor: tutorDetails,
		});
	} catch (error) {
		console.log("SignIn Error: ", error);
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
	tutorSignIn
};
