const mongoose = require("mongoose");

const unverifiedUserSchema = new mongoose.Schema({
	full_name: {
		type: String,
		required: true,
	},
	user_name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	otpExpiry: {
		type: Date,
		required: true,
	},
	expiresAt: {
		type: Date,
		default: () => Date.now() + 24 * 60 * 60 * 1000,
		expires: 0, 
	},
});

module.exports = mongoose.model("UnverifiedUser", unverifiedUserSchema);
