const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema(
	{
		full_name: { type: String, required: true },
		user_name: { type: String, required: true, unique: true },
		email: { type: String, required: true, unique: true },
		phone: { type: Number, required: true, unique: true },
		password: { type: String, required: true },
		avatar: { type: String },
		job_title: { type: String },
		bio: { type: String },
		total_revenue: { type: mongoose.Decimal128, default: 0.0 },
		withdrawn_amount: { type: mongoose.Decimal128, default: 0.0 },
		status: { type: Boolean, default: true },
		is_verified: { type: Boolean, default: false },
		social_profiles: { type: Map, of: String },
		created_at: { type: Date, default: Date.now },
		updated_at: { type: Date, default: Date.now },
	},
	{ collection: "tutors" }
);

module.exports = mongoose.model("Tutor", TutorSchema);
