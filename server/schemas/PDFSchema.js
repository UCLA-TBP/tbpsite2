const mongoose = require('mongoose');
require('mongoose-type-url');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const PDFSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  filename: { type: String, trim: true, required: true },
  contentType: { type: String, trim: true },
  cloudinaryURL: {
    type: mongoose.SchemaTypes.Url,
    trim: true,
    required: true,
  },
  subject: { type: String, trim: true, required: true },
  classNumber: { type: String, trim: true, required: true },
  professor: { type: String, trim: true },
  testType: { type: String, trim: true },
  testNum: { type: String, trim: true },
});

PDFSchema.plugin(findOrCreate);

module.exports = mongoose.model('PDF', PDFSchema);
