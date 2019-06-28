var http = require('http');
var path = require('path');
var express = require('express');
var socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const pubDirectory = path.join(__dirname, '../public');

app.use(express.static(pubDirectory));

let count = 0;

io.on('connection',(socket) => {
  //console.log(socket);
  socket.emit('message','Welcome!');
  socket.broadcast.emit('message','A new user has joined!');

  socket.on('sendlocation',(coords,callback) => {
    io.emit('message',`https://google.com/maps?q=${coords.latitude},${coords.longitude}`);
    callback();
  });

  socket.on('sendMessage',(message,callback) => {
    io.emit('message',message);
    callback();
  });

  socket.on('disconnect',() => {
    io.emit('message','A user has left!');
  });

});

server.listen(port,() => {
  console.log(`Server listening on port ${port}...`);
});
