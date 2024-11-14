const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const chalk = require("chalk");
const session = require('express-session')

dotenv.config();

const authRouter = require('./routes/authRoute')

const app = express();
app.use(express.json());
app.use(cors({
	origin: process.env.CLIENT_URL,
	credentials: true
}));

app.use(session({
	secret: process.env.JWT_SECRET,
	resave: false,
	saveUninitialized: false
}))


app.use('/auth', authRouter)







mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log(
			chalk.yellowBright.bold(
				"\t|              " +
					chalk.greenBright.bold("Connected to MongoDB😊") +
					"                 |"
			)
		);
		console.log(
			chalk.yellowBright.bold(
				`\t|                                                     |`
			)
		);
		console.log(
			chalk.yellowBright.bold(
				`\t-------------------------------------------------------`
			)
		);
	})
	.catch((err) => {
		const errorMessage = chalk.redBright.bold(
			"MongoDB connection error: " + err
		);
		console.log(errorMessage);
	});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(
		chalk.yellowBright.bold(
			`\n\t-------------------------------------------------------`
		)
	);
	console.log(
		chalk.yellowBright.bold(
			`\t|                                                     |`
		)
	);
	console.log(
		chalk.yellowBright.bold(
			`\t|        🌐 Server is running on Port =>` +
				chalk.cyanBright.bold(` ${PORT}`) +
				`         |`
		)
	);
});
