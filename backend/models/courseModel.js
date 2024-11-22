const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
	},
	category_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true,
	},
	tutor_id: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Tutor",
		required: true,
	},
	language: {
		type: String,
		required: true,
	},
	level: {
		type: String,
		required: true,
	},
	created_at: {
		type: Date,
		default: Date.now,
	},
	updated_at: {
		type: Date,
		default: Date.now,
	},
	course_thumbnail: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	price: {
		type: mongoose.Schema.Types.Decimal128,
		required: true,
	},
	enrolled_count: {
		type: Number,
		default: 0,
	},
	duration: {
		type: Number,
		required: true,
	},
	is_listed: {
		type: Boolean,
		default: true,
	},
});

module.exports = mongoose.model("Course", courseSchema);
