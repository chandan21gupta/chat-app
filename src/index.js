vat alpha;
var http = require('http');
var path = require('path');
var express = require('express');
var socketio = require('socket.io');
const { generateMessage } = require('./utils/messages');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const port = process.env.PORT || 3000;
const pubDirectory = path.join(__dirname, '../public');

app.use(express.static(pubDirectory));

let count = 0;

io.on('connection', (socket) => {
    //console.log(socket);
    socket.emit('message', generateMessage('Welcome!'));
    socket.broadcast.emit('message', generateMessage('A new user has joined!'));

    socket.on('sendLocation', (coords, callback) => {
        io.emit('locationMessage', generateMessage(`https://google.com/maps?q=${coords.latitude},${coords.longitude}`));
        callback();
    });

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', generateMessage(message));
        callback();
    });

    socket.on('disconnect', () => {
        io.emit('message', generateMessage('A user has left!'));
    });

});

server.listen(port, () => {
    console.log(`Server listening on port ${port}...`);
});