const http = require('http');
var path = require('path');
var express = require('express');

var app = express();
const server = http.createServer(app);

const port = process.env.PORT || 3000;
const pubDirectory = path.join(__dirname,'../public');

app.use(express.static(pubDirectory));

server.listen(port,() => {
  console.log(`Server listening on port ${port}...`);
});
