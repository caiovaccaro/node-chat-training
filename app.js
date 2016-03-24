var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var users = 0;

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected!!');

  io.emit('connected', { for: 'everyone' });
  users++;

  if(users === 4) {
  	io.emit('cheio', { for: 'everyone' });
  }

  socket.on('disconnect', function(){
  	users--;
  	io.emit('disconnected', { for: 'everyone' });
    console.log('user disconnected');
  });
});

http.listen(4000, function() {
	console.log('Up on 4000.');
});