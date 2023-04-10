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
  const { email } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (user)
        res.status(400).json({
          message: { msgBody: 'Email is already in use', msgError: true },
        });
      else {
        const newUser = User(req.body);
        newUser
          .save()
          .then((savedUser) => {
            res.status(201).json({
              message: {
                msgBody: 'Account successfully created',
                msgError: false,
              },
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).json({
              message: { msgBody: 'Error saving user', msgError: true },
            });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: { msgBody: 'Cannot register user', msgError: true },
      });
    });
});

userRouter.post(
  '/login',
  passport.authenticate('local', { session: false }),
  (req, res) => {
    if (req.isAuthenticated()) {
      const token = signToken(req.user._id);
      res.cookie('access_token', token, { httpOnly: true, sameSite: true });
      res.status(200).json({
        isAuthenticated: true,
        user: req.user,
      });
    }
  }
);

userRouter.post(
  '/logout',
  // passport.authenticate('jwt', { session: false }),
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
    res.status(200).json({ isAuthenticated: true, user: req.user });
  }
);

// get user by id
userRouter.get('/get-user/:id', (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not retrieve user by id from database');
    });
});

userRouter.get('/get-candidates', (req, res) => {
  User.find({ position: 'candidate' })
    .then((candidates) => {
      res.send(candidates);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not retrieve candidates');
    });
});

userRouter.get('/get-all-users', (req, res) => {
  User.find()
    .then((users) => res.send(users))
    .catch((err) => {
      console.log(err);
      res.status(500).send('Could not retrieve users');
    });
});

userRouter.put(
  '/update-user/:id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    //console.log(req.body);
    User.findByIdAndUpdate(req.params.id, { $set: req.body })
      .then((user) => {
          //console.log(user)
          res.status(200)
          res.send("successfully updated user")}
        )
      .catch((err) => {
        console.log(err);
        res.status(500).send('Could not update user');
      });
  }
);

module.exports = userRouter;
