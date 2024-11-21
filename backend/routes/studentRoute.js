const express = require("express");
const studentRouter = express.Router();

const {updateStudent } = require('../controllers/studentController')

studentRouter.put('/update-profile', updateStudent)

module.exports = studentRouter;
