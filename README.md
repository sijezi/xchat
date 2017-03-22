## Synopsis

This is a basic chat application that utilizes `Node.JS` and `socket.io`. Web sockets in general allow `messages` to be pushed to other connected clients on the server.

## Socket Connections

```javascript
io.on('connection', function(socket){
  console.log('a user connected');
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
```

## Motivation

I was motivated after looking at the `socket.io` documentation. I was amazed at how easy it is to create a socket connection.

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

I am using `socket.io` + `express.js` + `Node.js`

## Tests

I am still trying to figure out how to do `TESTS` with code written in `Node`.

## Contributors

I am the only contributor for this project.

## License

A short snippet describing the license (MIT, Apache, etc.)
