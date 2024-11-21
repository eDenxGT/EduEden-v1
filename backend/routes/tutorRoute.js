const express = require('express')
const tutorRouter = express.Router()

const { updateTutor } = require('../controllers/tutorController')

tutorRouter.put('/update-profile', updateTutor)

module.exports = tutorRouter