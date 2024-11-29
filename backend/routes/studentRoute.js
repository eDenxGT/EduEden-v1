const express = require("express");
const studentRouter = express.Router();

const { verifyStudent } = require("../middlewares/auth");
const { updateStudent } = require("../controllers/studentController");

studentRouter.put("/update-profile", verifyStudent, updateStudent);

module.exports = studentRouter;
