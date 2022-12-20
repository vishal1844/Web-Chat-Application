var express = require('express');
var http = require('http');

var app = express();
var server = http.createServer(app);

var io = require('socket.io')(server);
var path = require('path');


app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
res.sendFile(__dirname + '/index.html');
});


const users = {};

io.on('connection', (socket) => {
  socket.on('new-user-joined', name => {
    // console.log("New user", name);
  	users[socket.id] = name;
    socket.broadcast.emit('User-Joined', name);
  });

  socket.on('send', message =>{

    socket.broadcast.emit('receive', {message: message, name : users[socket.id]})
  })

  socket.on('disconnect', message =>{
    socket.broadcast.emit('left', users[socket.id]);
    delete users[socket.id];
  })
});

server.listen(8000, () => {
  console.log('Server listening on :8000');
});