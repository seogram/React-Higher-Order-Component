var mongoose = require('mongoose');
var noteSchema = mongoose.Schema({
  //note_id : String,
  note_date : Date,
  title :  String ,
  description : String,
  important : Boolean,
  user_id : String,
});

var Note = mongoose.model('Note',noteSchema);
module.exports = Note;
