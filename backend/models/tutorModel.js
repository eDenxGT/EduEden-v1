const mongoose = require("mongoose");

const TutorSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
      required: true,
    },
    user_name: {
      type: String,
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
    avatar: {
      type: String,
    },
    job_title: {
      type: String,
    },
    bio: {
      type: String,
    },
    total_revenue: {
      type: Number,
      default: 0,
    },
    withdrawn_amount: {
      type: Number,
      default: 0,
    },
    is_blocked: {
      type: Boolean,
      default: true,
    },
    is_phone_verified: {
      type: Boolean,
      default: false,
    },
    social_profiles: {
      type: Object,
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
  { collection: "tutors" }
);

module.exports = mongoose.model("Tutor", TutorSchema);
