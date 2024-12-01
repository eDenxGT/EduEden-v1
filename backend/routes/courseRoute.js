const express = require("express");
const courseRouter = express.Router();

const {
	createCourse,
	getCoursesByTutorId,
	getAllCourses,
	getAllListedCourses,
	getCourseByCourseId,
	updateCourse,
	deleteCourseById,
	handleCourseStatus,
	getCoursesByStudentId
} = require("../controllers/courseController");

courseRouter
	.post("/new", createCourse)
	.put("/update/:course_id", updateCourse)
	.get("/my-courses/:tutor_id", getCoursesByTutorId)
	.get("/get-all", getAllCourses)
	.get("/get-listed", getAllListedCourses)
	.get("/get/:course_id", getCourseByCourseId)
	.delete("/delete/:course_id", deleteCourseById)
	.put("/status/:course_id", handleCourseStatus)
	.get("/student/my-courses/:student_id", getCoursesByStudentId);

module.exports = courseRouter;
