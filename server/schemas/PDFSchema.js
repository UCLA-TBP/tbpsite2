const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const PDFSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: { type: String },
  contentType: { type: String },
  data: { type: Buffer },
  subject: { type: String },
  classNumber: { type: String },
  professor: { type: String }
});

PDFSchema.plugin(findOrCreate);

module.exports = mongoose.model('PDF', PDFSchema);
