var socket = io("https://localhost:3000");

socket.on("connection", function (socket) {
    console.log(socket);
});
