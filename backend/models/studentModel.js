const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
	{
		full_name: {
			type: String,
			required: true,
		},
		user_name: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
		},
		phone: {
			type: Number,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		google_id: {
			type: String,
		},
		avatar: {
         type: String,
		},
		active_courses: [
			{
            type: mongoose.Schema.Types.ObjectId,
				ref: "Course",
			},
		],
		completed_quizzes: [
         {
            type: mongoose.Schema.Types.ObjectId,
				ref: "Quiz",
			},
		],
      is_blocked: {
         type: Boolean,
         default: false,
      },
		is_phone_verified: {
			type: Boolean,
			default: false,
		},
		created_at: {
			type: Date,
			default: Date.now,
		},
		updated_at: {
			type: Date,
			default: Date.now,
		},
	},
	{ collection: "students" }
);

module.exports = mongoose.model("Student", StudentSchema);
