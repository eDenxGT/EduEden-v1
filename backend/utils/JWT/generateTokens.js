const jwt = require("jsonwebtoken");

const generateAccessToken = (role, data) => {
	if (role === "student") {
		return jwt.sign({ data }, process.env.JWT_STUDENT_ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
		});
	} else if (role === "admin") {
		return jwt.sign({ data }, process.env.JWT_ADMIN_ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
		});
	} else if (role === "tutor") {
		return jwt.sign({ data }, process.env.JWT_TUTOR_ACCESS_TOKEN_SECRET, {
			expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRES,
		});
	}
};

const generateRefreshToken = (role, data) => {
	if (role === "student") {
		return jwt.sign(
			{ data },
			process.env.JWT_STUDENT_REFRESH_TOKEN_SECRET,
			{
				expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
			}
		);
	} else if (role === "admin") {
		return jwt.sign({ data }, process.env.JWT_ADMIN_REFRESH_TOKEN_SECRET, {
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
		});
	} else if (role === "tutor") {
		return jwt.sign({ data }, process.env.JWT_TUTOR_REFRESH_TOKEN_SECRET, {
			expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRES,
		});
	}
};

module.exports = { generateAccessToken, generateRefreshToken };
