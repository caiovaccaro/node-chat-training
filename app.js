var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = {};

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
	users[socket.id] = { name: Object.keys(users).length, id: socket.id };

  socket.on('message', function(coco){
  	io.emit('client-message', { message: coco.user + " disse: " + coco.message });
  });

	socket.on('save-user', function(data){
  	users[socket.id].name = data.user;
		io.emit('user-saved');
		io.sockets.connected[users[socket.id].id].emit('connected', { user: users[socket.id].name });
		io.emit('user-connected', { users: users });
	  io.emit('client-message', { message: users[socket.id].name + " entrou.", className: "info" });
  });

  socket.on('disconnect', function() {
    io.emit('client-message', { message: users[socket.id].name + " saiu :(", className: "info" });
		delete users[socket.id];
  	io.emit('disconnected', { users: users });
  });
});

http.listen(4000, function() {
	console.log('Up on 4000.');
});
