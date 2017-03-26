var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
  //console.log('Connected to socket.io server');
});

socket.on('message', function(data) {
  console.log('New Message');
    console.log(data.text);
});

var form = $('#message-form');
var input = $('#msg');
form.on('submit', function(e) {
  // submit without refreshing the whole page
  e.preventDefault();
  socket.emit('message', {
    text: input.val()
  })

  input.val('');
});
