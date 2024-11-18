const express = require("express");
const adminRouter = express.Router();

const {
	getTutors,
	toggleTutorStatus,
	getStudents,
	toggleStudentStatus,
	searchStudents,
	searchTutors,
} = require("../controllers/adminController");

adminRouter
	.get("/get-tutors", getTutors)
	.post("/toggle-tutor-status", toggleTutorStatus)
	.get("/get-students", getStudents)
	.post("/toggle-student-status", toggleStudentStatus)
	.get("/search-students", searchStudents)
	.get("/search-tutors", searchTutors);

module.exports = adminRouter;
