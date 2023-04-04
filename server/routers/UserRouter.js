const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../schemas/UserSchema');

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: 'tbpwebmaster',
      sub: userID,
    },
    'tbpwebmaster',
    { expiresIn: '1hr' }
  );
};

userRouter.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['email'], session: false })
);

userRouter.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/', session: false }),
  function (req, res) {
    if (req.isAuthenticated()) {
      const { _id } = req.user;
      const token = signToken(_id);
      res.redirect('http://localhost:3000/GoogleCB/' + token);
      // res.redirect('https://tbp.seas.ucla.edu/GoogleCB/' + token);
    }
  }
);

userRouter.post('/register', (req, res) => {
  const { email, name, password } = req.body;
  User.findOne({ email }, (err, user) => {
    if (err)
      res.status(500).json({
        message: { msgBody: 'Server error has occured', msgError: true },
      });
    else if (user)
      res.status(400).json({
        message: { msgBody: 'Email is already in use', msgError: true },
      });
    else {
      const newUser = User({ email, username, password });
      newUser.save((err) => {
        if (err) {
          console.log(err);
          res.status(500).json({
            message: { msgBody: 'Error saving user', msgError: true },
          });
        } else
          res.status(201).json({
            message: {
              msgBody: 'Account successfully created',
              msgError: false,
            },
          });
      });
    }
  });
});

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const { _id, username } = req.user; // also extract other pertinent info (name, etc.)
      const token = signToken(_id);
      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: { _id, username },
      });
    }
  }
);

userRouter.post(
  '/logout',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: null, success: true }); // clear user appropriately
  }
);

// get currently authenticated user
userRouter.get(
  '/authenticated-user',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const { _id, username } = req.user; // also extract other pertinent info (name, etc.)
    res.status(200).json({ isAuthenticated: true, user: { _id, username } });
  }
);

// get user by id
userRouter.get('/get-user/:id', (req, res) => {
  User.findById(req.params.id).exec((err, user) => {
    if (err) {
      console.log(err);
      res.status(500).send('Could not retrieve user by id from database');
    }
    const { _id, username } = user;
    res.send({ _id: _id, username: username });
  });
});

module.exports = userRouter;
