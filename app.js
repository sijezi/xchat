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
//var url = require('url');
app.get('/app.html', function(req, res) {
    //console.log(req.query.name);
name = req.query.name;
console.log(name)
    //res.send('Response sent to client::'+ req.query.name);
    res.sendFile(__dirname + "/public/" + "app.html");
});

var name = qs.parse('name');
// middleware for rendering
app.use(express.static(__dirname + '/public'));

//console.log(req.query.name);

app.use(function(err, req, next) {
    if (err.status !== 404) {
        return next();
    }
    res.send(err.message || '** No Errors Found **');
});

socket.on('connection', function(connection) {
    console.log('User connected via socket.io');
    connection.on('chat message', function(data) {
        console.log('Message Recieved: ' + data.text);
        // send to everyone
        socket.emit('chat message', {
          text: data.text,
          name: data.name
        });
    });

    // data to be passed to the frontend
    connection.emit('chat message', {
        name: name,
        text: 'You can chat!'
    });
});

// start the server
http.listen(process.env.PORT || 3000, function() {
    console.log('The * server * is running at localhost:', PORT);
});
