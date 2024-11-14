const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  user_name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: { type: Number, required: true, unique: true },
  password: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
}, { collection: 'admins' });  // specify collection name

module.exports = mongoose.model('Admin', AdminSchema);
