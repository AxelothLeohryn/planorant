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
        // Assuming message data includes { message, teamId }
        console.log(data);
        
        // Emit message only to users of the same team
        users.filter(u => u.teamId === data.teamId).forEach(user => {
          io.to(user.socketID).emit("messageResponse", data);
        });
      });

    // Listens when a new user joins the server
    socket.on("newUser", (data) => {
      // Adds the new user to the list of users
      console.log("New user received: ", data);
      users.push({ ...data, socketID: socket.id }); // Ensure socketID is added correctly
      console.log("Users list: ", users);

      // Send the user list to all users in the same team
  users.filter(u => u.teamId === data.teamId).forEach(user => {
    io.to(user.socketID).emit("newUserResponse", users.filter(u => u.teamId === data.teamId));
  });
    });

    socket.on("disconnect", () => {
      console.log(`🔥: User ${socket.id} disconnected`);
      // Updates the list of users when a user disconnects from the server
      users = users.filter((user) => user.socketID !== socket.id);
      io.emit('newUserResponse', users);
    });
  });
};
