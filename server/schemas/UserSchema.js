const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');

const UserSchema = new mongoose.Schema({
  email: {
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
  position: {
    type: String,
    enum: ['candidate', 'member', 'officer'],
    required: true,
    default: 'candidate',
  },
  name: {
    first: {
      type: String,
      trim: true,
      required: true,
    },
    last: {
      type: String,
      trim: true,
      required: true,
    },
  },
  // add resume, submitted tests field, other profile information (name, etc.)
});

function hasLoginOrGoogleId() {
  return (this.email && this.password) || this.googleId;
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
