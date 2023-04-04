const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('./schemas/UserSchema');

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

passport.use(
  new JwtStrategy(
    {
      jwtFromRequest: cookieExtractor,
      secretOrKey: 'tbpwebmaster',
      passReqToCallback: true,
    },
    (req, payload, done) => {
      User.findById({ _id: payload.sub }, (err, user) => {
        if (err) return done(err, false);
        if (user) return done(null, user, req.body);
        else return done(null, false);
      });
    }
  )
);

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_ID, // TODO: setup google dev console w/ TBP webmaster email
      clientSecret: process.env.GOOGLE_SECRET,
      callbackURL: '/user/auth/google/callback',
    },
    function (accessToken, refreshToken, email, callback) {
      const emailAddress = email.emails[0].value;
      User.findOrCreate(
        {
          googleId: email.id, // assign other fields appropriately
        },
        function (err, user) {
          return callback(err, user);
        }
      );
    }
  )
);

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {
      User.findOne({ username }, (err, user) => {
        if (err) return done(err, false);
        if (!user) return done(null, false);
        user.comparePassword(password, done);
      });
    }
  )
);
