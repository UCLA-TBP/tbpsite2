const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    trim: true,
    index: { unique: true },
    validate: [
      hasLoginOrGoogleId,
      'Login credentials or Google ID is required',
    ],
  },
  password: {
    type: String,
    trim: true,
    validate: [
      hasLoginOrGoogleId,
      'Login credentials or Google ID is required',
    ],
  },
  googleId: {
    type: String,
    index: {
      unique: true,
      partialFilterExpression: { googleId: { $type: 'string' } },
    },
    validate: [
      hasLoginOrGoogleId,
      'Login credentials or Google ID is required',
    ],
  },
  // add resume, submitted tests field, other profile information (name, etc.)
});

function hasLoginOrGoogleId() {
  return (this.username && this.password) || this.googleId;
}

UserSchema.plugin(findOrCreate);

UserSchema.pre('save', function (next) {
  if (!this.isModified('password')) return next();
  bcrypt.hash(this.password, 10, (err, hashedPassword) => {
    if (err) return next(err);
    this.password = hashedPassword;
    next();
  });
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    else {
      if (!isMatch) return callback(null, isMatch);
      return callback(null, this);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
