let socket = io.connect("http://localhost:4000/");

let message = document.getElementById("message"),
  handle = document.getElementById("handle"),
  btn = document.getElementById("send"),
  output = document.getElementById("output");
feedback = document.getElementById("feedback");

//send button action
btn.addEventListener("click", function () {
  //emit to server
  socket.emit("message-sent", {
    handle: handle.value,
    message: message.value,
  });
  message.value = "";
});

//typing action
message.addEventListener("keypress", function () {
  //emit to server
  socket.emit("typing", handle.value);
});

// listen msg sent event from server
socket.on("message-sent", function (data) {
  output.innerHTML += ` <p><strong>${data.handle}</strong> ${data.message}</p>`;
});
// listen typing event from server
socket.on("typing", function (data) {
  feedback.innerHTML = ` <p><em>${data} is typing...</em></p>`;
  setTimeout(() => {
    feedback.innerHTML = "";
  }, 5000);
});
