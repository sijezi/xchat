/**
 * Set the environment variable for Heroku
 * If it is not available, use PORT 3000
 */
var PORT = process.env.PORT || 3000;

// include these modules
var express = require('express');
var app = express();
var http = require('http').Server(app);
var socket = require('socket.io')(http);

// middleware for rendering
app.use(express.static(__dirname + '/public'));
app.use(function(err, req, next){
  if(err.status !== 404) {
    return next();
  }
  res.send(err.message || '** No Errors Found **');
});
socket.on('connection', function(connection) {
  console.log('User connected via socket.io');
  connection.on('message', function(data) {
    console.log('Message Recieved: ' + data.text);
    // send to everyone except the sender
    socket.emit('message', data);
  });

  // data to be passed to the frontend
  connection.emit('message', {
    text: 'You can chat!'
  });
});

// start the server
http.listen(process.env.PORT || 3000, function() {
  console.log('The * server * is running at localhost:', PORT);
});
