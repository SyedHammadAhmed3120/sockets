var express = require('express');
var logger = require('morgan');
var path = require('path');

var app = express();

var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

var port = process.env.port || 3000;

server.listen(port, function(){
    console.log('App running on port ' + port); 
});

app.get('/', function(req, res) {
   res.sendFile(__dirname + '/public/html/index.html');
});

io.sockets.on('connection', function(socket) {
   socket.on('new user', function(data) {
       socket.username = data;
   });
    
    socket.on('send message', function(data) {
       io.sockets.emit('new message', { message: data, username: socket.username });
   });
});