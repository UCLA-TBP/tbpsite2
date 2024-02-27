const mongoose = require('mongoose');
require('mongoose-type-url');
const bcrypt = require('bcrypt');
const findOrCreate = require('mongoose-findorcreate');
const PDFSchema = require('./PDFSchema');

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
  major: {
    type: String,
    enum: [
      'Aerospace Engineering',
      'Bioengineering',
      'Chemical Engineering',
      'Civil Engineering',
      'Computer Engineering',
      'Computer Science',
      'Computer Science and Engineering',
      'Electrical Engineering',
      'Materials Engineering',
      'Mechanical Engineering',
      'Undeclared Engineering',
    ],
    trim: true,
    required: true,
  },
  graduationYear: {
    type: Number,
    trim: true,
    required: true,
  },
  initiationQuarter: {
    quarter: {
      type: String,
      enum: ['Fall', 'Spring'],
      trim: true,
      required: true,
    },
    year: {
      type: Number,
      trim: true,
      required: true,
    },
  },
  requirements: {
    tutoring: {
      type: Boolean,
      default: false,
    },
    testBank: {
      type: Boolean,
      default: false,
    },
    corporate: {
      type: Boolean,
      default: false,
    },
    interview: {
      type: Boolean,
      default: false,
    },
    candidateQuiz: {
      type: Boolean,
      default: false,
    },
    bentPolishing: {
      type: Boolean,
      default: false,
    },
    initiation: {
      type: Boolean,
      default: false,
    },
    membershipFee: {
      type: Boolean,
      default: false,
    },
    newMemberForm: {
      type: Boolean,
      default: false,
    },
    generalSocial1: {
      type: Boolean,
      default: false,
    },
    generalSocial2: {
      type: Boolean,
      default: false,
    },
    coffeeChat: {
      type: Boolean,
      default: false,
    },
    academicOutreach: {
      type: Boolean,
      default: false,
    },
    socialMediaPost: {
      type: Boolean,
      default: false,
    },
    chalking: {
      type: Boolean,
      default: false,
    },
  },
  tutoringLog: {
    type: [
      {
        week: { type: Number },
        hours: { type: Number },
        secretPhrase: { type: String },
      },
    ],

    default: [],
  },
  submittedTests: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PDF' }],

    default: [],
  },
  lastPasswordResetReq: {
    type: Date,
  },
  distinguishedActiveMember: {
    quarterOneRequirements: {
        AO: {
            type: Boolean,
            default: false,
        },
        Tutoring: {
            type: Boolean,
            default: false,
        },
        EMCC: {
            type: Boolean,
            default: false,
        },
        social: {
            type: Boolean,
            default: false,
        },
    },
    quarterTwoRequirements: {
        AO: {
            type: Boolean,
            default: false,
        },
        Tutoring: {
            type: Boolean,
            default: false,
        },
        EMCC: {
            type: Boolean,
            default: false,
        },
        social: {
            type: Boolean,
            default: false,
        },
    }
  },
  committees: {
    President: {
      type: Boolean,
      default: false,
    },
    VP: {
      type: Boolean,
      default: false,
    },
    AO: {
      type: Boolean,
      default: false,
    },
    Corporate: {
      type: Boolean,
      default: false,
    },
    EMCC: {
      type: Boolean,
      default: false,
    },
    MC: {
      type: Boolean,
      default: false,
    },
    Projects: {
      type: Boolean,
      default: false,
    },
    Publicity: {
      type: Boolean,
      default: false,
    },
    Secretary: {
      type: Boolean,
      default: false,
    },
    Social: {
      type: Boolean,
      default: false,
    },
    Treasurer: {
      type: Boolean,
      default: false,
    },
    Tutoring: {
      type: Boolean,
      default: false,
    },
    Webmaster: {
      type: Boolean,
      default: false,
    },
  },
  headshotURL: {
    type: mongoose.SchemaTypes.Url,
    trim: true,
    required: false,
  }
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

UserSchema.pre('remove', function (next) {
  this.model('PDF').remove({ user: this._id }, next);
});

UserSchema.methods.comparePassword = function (password, callback) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return callback(err);
    else {
      if (!isMatch) {
        return callback(null, isMatch);
      }
      return callback(null, this);
    }
  });
};

module.exports = mongoose.model('User', UserSchema);
