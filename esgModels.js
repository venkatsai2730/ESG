// esgModel.js (for MongoDB)
const mongoose = require('mongoose');

const esgSchema = new mongoose.Schema({
  company: String,
  environmental: Number,
  social: Number,
  governance: Number,
});

module.exports = mongoose.model('ESG', esgSchema);
