const express = require('express');
const app = express();
var dotenv = require('dotenv').config({ path: `${__dirname}/.env` });
var LocalStorage = require('node-localstorage').LocalStorage;
LocalStorage = new LocalStorage('./scratch');
const passport = require('passport');
const passportConfig = require('./passport');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization'],
    origin: [process.env.CLIENT_URL || 'http://localhost:3000'], // replace w/ deployed url on deployment
  })
);

console.log(process.env.CLIENT_URL);

var uri = process.env.MONGO_URI;

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.log('Error connecting to MongoDB:', err);
  });

const userRouter = require('./routers/UserRouter.js');
app.use('/user', userRouter);

const PDFRouter = require('./routers/PDFRouter');
app.use('/pdf', PDFRouter);

const PORT = process.env.PORT || 8000;

app.listen(PORT, function () {
  console.log(`Server started on port ${PORT}`);
});
