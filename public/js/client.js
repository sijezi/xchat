var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
    //console.log('Connected to socket.io server');
});

socket.on('chat message', function(data) {
  var now = new Date();
  var timestamp = now.toLocaleTimeString();
    console.log('New Message');
    console.log(data.text);
    var parent = document.getElementById('childElement').parentNode;
    var newNode = document.createElement("p");
    newNode.innerHTML = timestamp + ' - ' + data.text;
    parent.appendChild(newNode);

});

var form = document.getElementById('chat-form');
var input = document.getElementById('msg');

form.addEventListener('submit', function(event) {
    event.preventDefault();
    if (input.value === '') {
        return false;
    }
    socket.emit('chat message', {
        text: input.value
    });
    input.value = '';
});
