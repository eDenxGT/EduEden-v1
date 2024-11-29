const storeToken = (token_name, token, max_age, res) => {
    
	res.cookie(token_name, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		maxAge: 7 * 24 * 60 * 60 * 1000, 
	});
};

module.exports = storeToken;
