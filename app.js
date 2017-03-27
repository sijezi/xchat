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
var qs = require('qs');
var name = '';

// grab the Query String from the browser
app.get('/app.html', function(req, res) {
    // grab the query string and store it
    name = req.query.name;
    console.log(name)
    //res.send('Response sent to client::'+ req.query.name);
    res.sendFile(__dirname + "/public/" + "app.html");
});

var name = qs.parse('name');
// middleware for rendering
app.use(express.static(__dirname + '/public'));

// error checking
app.use(function(err, req, next) {
    if (err.status !== 404) {
        return next();
    }
    res.send(err.message || '** No Errors Found **');
});

// when a connection is established with socket.io
socket.on('connection', function(connection) {
    console.log('user is connected');
    connection.on('chat message', function(data) {
        // send to everyone
        socket.emit('chat message', {
            text: data.text,
            name: data.name
        });
    });

    // data to be passed to the frontend
    connection.emit('chat message', {
        name: name,
        text: 'just logged into this chatroom!'
    });
});

// start the server
http.listen(process.env.PORT || 3000, function() {
    console.log('The * server * is running at localhost:', PORT);
});
