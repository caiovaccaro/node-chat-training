var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
	res.sendFile(__dirname + '/client/index.html');
});

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('event', function(msg) {
  	console.log(msg);
  })

  io.emit('uaaaa', { for: 'everyone' });
});

http.listen(3000, function() {
	console.log('Up on 3000.');
});
