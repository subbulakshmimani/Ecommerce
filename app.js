//modules
const fs = require('fs');
const express = require('express');
const db = require('./database/database.js');
const app = express();
const body_parser = require('body-parser');
const session = require('express-session');
const cookie = require('cookie-parser');
const UserRouter = require('./routes/user_route');







//view engine
app.set('view engine', 'ejs');
//middlewares
// Serve static assets from the "assets" directory
app.use(express.static('assets'));
app.use(body_parser.json());
app.use(body_parser.urlencoded({ extended: true }));





//session cookie
const oneday = 1000 * 24 * 60 * 60;

app.use(session({
  secret: 'hjfgjhdfgdhgdfgdfhg',
  saveUninitialized: true,
  cookie: { maxage: oneday },
  resave: false,
}));

app.use(cookie());
app.use('/', UserRouter);



module.exports = app;