const express = require('express');
var app = express();
 
app.listen(3001, function (err) {
  if (err) {
    return console.log(err);
  }
  console.log('API Sever is listening on http://localhost:3001');
});
