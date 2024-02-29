const socketIO = require("socket.io");

module.exports = (http) => {
  let users = [];

  const io = socketIO(http, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    socket.on("message", (data) => {
      console.log(data);
      io.emit("messageResponse", data);
    });

    // Listens when a new user joins the server
    socket.on("newUser", (data) => {
      // Adds the new user to the list of users
      console.log("New user received: ", data);
      users.push({ ...data, socketID: socket.id }); // Ensure socketID is added correctly
      console.log("Users list: ", users);
      // Sends the list of users to the client
      io.emit("newUserResponse", users);
    });

    socket.on("disconnect", () => {
      console.log(`🔥: User ${socket.id} disconnected`);
      // Updates the list of users when a user disconnects from the server
      users = users.filter((user) => user.socketID !== socket.id);
      io.emit('newUserResponse', users);
    });
  });
};
