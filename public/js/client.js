var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
  console.log('Connected to socket.io server');
});

// events
socket.on('message', function(data) {
  var msg = document.querySelector('.textarea');

});

$('#msgForm').submit('submit', function(ev) {
var message = $('.textarea');
var data = {
  text: message.val()
};
console.log(message.val());
socket.emit('message', {text: message.val()});

});
