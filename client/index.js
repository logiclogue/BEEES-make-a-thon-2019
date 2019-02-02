var socket = io("http://localhost:3000");

socket.on("connection", function (socket) {
    console.log(socket);
});
