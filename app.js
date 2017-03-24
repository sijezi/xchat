/**
 * Use whatever is in the environment variable PORT
 * If there is nothing there, resort to 3000
 */
var PORT = process.env.PORT || 3000;

// Import the express framework
var express = require('express');
// Run express
var app = express();
// Import the http built-in moodule and save it to the http varaible
var http = require('http').Server(app);

// passing http.Server instance
var socket = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// listen for events
socket.on('connection', function(socket) {
  var data = {text: 'my first message'};
  socket.on('msg', function(msg) {
    console.log('message recieved', msg.text);
    // send to all except the sender
    socket.broadcast.emit('message', msg);
  })
    console.log('User connected via socket.io');
    socket.emit('message', data);
})
// start the Server
http.listen(PORT, function() {
    console.log('Server running');
});
