var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
  console.log('Connected to socket.io server');
});

socket.on('message', function(data) {
  console.log('New Message');
    console.log(data.text);
});
