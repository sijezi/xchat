var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
  console.log('Connected to socket.io server');
});

// events
socket.on('message', function(data) {
  console.log('new message');
  console.log(data.text);
});
