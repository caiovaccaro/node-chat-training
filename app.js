var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
	users[socket.id] = { name: Object.keys(users).length, id: socket.id };

  io.sockets.connected[users[socket.id].id].emit('connected', { user: users[socket.id].name });
  io.emit('client-message', { message: "User " + users[socket.id].name + " entrou." });

  socket.on('message', function(data){
  	io.emit('client-message', { message: "User " + data.user + " disse: " + data.message });
  });

  socket.on('disconnect', function(){
  	io.emit('disconnected', { for: 'everyone' });
    io.emit('client-message', { message: "User " + users[socket.id].name + " saiu :(" });
  });
});

http.listen(4000, function() {
	console.log('Up on 4000.');
});
