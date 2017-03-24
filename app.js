/**
 * Use whatever is in the environment variable PORT
 * If there is nothing there, resort to 3000
 */
var PORT = process.env.PORT || 3000;

// Import the express framework
var express = require('express');
var app = express();
// Import the http built-in moodule and save it to the http varaible
var http = require('http').Server(app);

// passing http.Server instance
var socket = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

// listen for events
socket.on('connection', function() {
  console.log('User connected via socket.io');
})
// start the Server
http.listen(PORT, function() {
    console.log('Server running');
});
