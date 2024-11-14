const bcrypt = require("bcryptjs");

const hashPassword = async (password) => {
	try {
		const hashedPassword = await bcrypt.hash(password, 10);
		return hashedPassword;
	} catch (error) {
		console.log("Hash Password error: ", error);
	}
};

module.exports = hashPassword;
