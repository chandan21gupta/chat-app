const http = require('http');
var path = require('path');
var express = require('express');
const socketio = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const pubDirectory = path.join(__dirname, '../public');

app.use(express.static(pubDirectory));

let count = 0;

io.on('connection',(socket) => {
  socket.emit('message','Welcome!')
  socket.on('sendMessage',(message) => {
    io.emit('message',message);
  });
});

server.listen(port,() => {
  console.log(`Server listening on port ${port}...`);
});
