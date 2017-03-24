var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
  console.log('Connected to socket.io server');
});

// events
socket.on('message', function(data) {
  var msg = document.querySelector('.textarea');
  console.log(msg.textContent)
});
