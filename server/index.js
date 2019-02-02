var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/../client'));  

app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/../client/index.html');
});

io.on("connection", client => {
    console.log("CONNECTED!!!");
});

server.listen(3000);
