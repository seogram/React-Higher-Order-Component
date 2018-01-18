const axios = require('axios');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
var app = express();
app.use(bodyParser.json({ type: '*/json' }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


/**
 * APIs
 */

mongoose.connect('mongodb://testUser:123456@ds261527.mlab.com:61527/note');

var db = mongoose.connection;
db.on('error', console.error.bind(console, '#Monodd-Connection error'));
var Note = require('./models/note.js');


/** 
 * Requesting All Notes
 * */
app.get('/allNotes', function (req, res) {

  Note.find().exec(function (err, notes) {
      if (err) {
        res.json(err);
      }
      res.json(notes);
    });

});

app.listen(3001, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});
