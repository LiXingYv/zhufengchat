var express = require('express');
var path = require('path');
var app = express();
var port = process.env.PORT | 3000;
app.use(express.static(path.join(__dirname,'app')));
app.use(function(req,res){
    res.sendFile(path.join(__dirname,'app','index.html'));
});
var server = app.listen(port);

var messages = [];

var io = require('socket.io').listen(server);

io.sockets.on('connection',function(socket){
    socket.emit('connected');
    socket.on('createMessage',function(message){
        messages.push(message);
        io.sockets.emit('message.add',message);
    });
    socket.on('getAllMessages',function(){
        socket.emit('allMessages',messages);
    });
});