let express = require("express");
let socket = require("socket.io");
//APP setup
let App = express();
let server = App.listen(4000, function () {
  console.log("Your server available at http://localhost:4000");
});

App.use(express.static("public"));

let io = socket(server);
io.on("connection", function (socket) {
  socket.on("message-sent", function (data) {
    //emit to all individual sockets
    io.sockets.emit("message-sent", data);
  });
  socket.on("typing", function (data) {
    //broadcast mean send all sockets except the sender
    socket.broadcast.emit("typing", data);
  });
});
