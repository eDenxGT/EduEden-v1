const express = require("express");
const lectureRouter = express.Router();

const { verifyTutor } = require("../middlewares/auth");

const {
	addLecture,
	updateLecture,
} = require("../controllers/lectureController");

lectureRouter
	.post("/new",verifyTutor, addLecture)
	.put("/update/:lecture_id", updateLecture);

module.exports = lectureRouter;
