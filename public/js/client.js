// https://socket.io/docs/emit-cheatsheet/#emit-cheatsheet

// Get the elements with the specified selector
var nameChange = document.getElementById('changeName');
var form = document.getElementById('chat-form');
var input = document.getElementById('msg');
var usr = document.querySelector('.is-5');
var usrHash = document.querySelector('.is-6');
var parent = document.getElementById('childElement').parentNode;
var newNode = document.createElement("p");

/**
 * qs - query string
 * source: http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values-in-javascript
 * @param  {String} str from window.location.search
 * @return {String} name is returned parsed from the url
 */
function qs(str) {
    var half = location.search.split(str + '=')[1];
    return half !== undefined ? decodeURIComponent(half.split('&')[0]) : null;
}

// save the name from query string
var name = qs('name');

// change username
nameChange.addEventListener('click', function() {
    window.history.back();
});

// socket.io client-side api
var socket = io();
// Successful connection made to the server
socket.on('connect', function() {
    // Emits an event to all connected clients. The following two are equivalent:
    socket.emit('joined', {
        name: name
    });
});

// send data to the client-side
socket.on('chat message', function(data) {
    // pure javascript timestamp
    var now = new Date();
    console.log(data.name)
    // convert timestamp to human readable format
    var timestamp = now.toLocaleTimeString();
    var parent = document.getElementById('childElement').parentNode;
    var newNode = document.createElement("p");
    console.log('New Message');
    console.log(data.text);
    newNode.innerHTML = '<p class="button is-disabled">' + '#' + data.name + '</p>' +
        ' - ' + ' ' +
        ' ' + '<p class="button">' + data.text + '</p>' + ' ' +
        ' <b class="button is-warning is-disabled">' + ' ' + timestamp + '</b>';
    // append the chat message to the chat-area
    parent.appendChild(newNode);
});

// add event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault(); // the default action of the event will not be triggered
    if (input.value === '') {
        return false;
    }

    // emit the name and messsage to all users including senders
    socket.emit('chat message', {
        text: input.value,
        name: name
    });
    // clearn the input form after it is submitted
    input.value = '';
});
