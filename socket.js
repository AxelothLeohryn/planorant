const socketIO = require("socket.io");
const Message = require("./models/Message");

module.exports = (http) => {
  let users = [];

  const io = socketIO(http, {
    cors: {
      origin: "http://localhost:5173",
    },
  });

  // Connection - Request Messages - Typing - Message - Disconnection

  io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

    // Listens when a new user joins the server
    socket.on("newUser", (data) => {
      // Adds the new user to the list of users
      console.log("New user received: ", data);
      users.push({ ...data, socketID: socket.id }); // Ensure socketID is added correctly
      console.log("Users list: ", users);

      // Send the user list to all users in the same team
      users
        .filter((u) => u.teamId === data.teamId)
        .forEach((user) => {
          io.to(user.socketID).emit(
            "newUserResponse",
            users.filter((u) => u.teamId === data.teamId)
          );
        });
    });

    socket.on("requestMessages", async ({ teamId }) => {
      try {
        const messages = await Message.find({ teamId })
          .sort({ time: -1 })
          .limit(50); // Adjust limit as needed
        // Reverse the messages to chronological order before sending
        socket.emit("messagesHistory", messages.reverse());
      } catch (error) {
        console.error("Error fetching messages from database", error);
      }
    });

    socket.on("typing", (data) => {
      console.log("Typing: ", data);
      // Emit typing status only to users of the same team
      users
      .filter((u) => u.teamId === data.teamId)
      .forEach((user) => {
        io.to(user.socketID).emit("typingUserAdd", data);
        console.log("Typing user added");
      });
    });

    socket.on("stopTyping", (data) => {
      // Emit stop typing status only to users of the same team
      users
      .filter((u) => u.teamId === data.teamId)
      .forEach((user) => {
        io.to(user.socketID).emit("typingUserDelete", data);
      });
    });

    socket.on("message", async (data) => {
      // Assuming message data includes { message, teamId }
      console.log(data);

      // Create and save the message document
      const message = new Message({
        text: data.text,
        username: data.name,
        image: data.image,
        senderId: data.senderId, // Consider changing this to userID if available
        teamId: data.teamId,
        time: data.time,
      });
      try {
        await message.save();
        console.log("Message saved to database");
      } catch (error) {
        console.error("Error saving message to database", error);
      }

      // Emit message only to users of the same team
      users
        .filter((u) => u.teamId === data.teamId)
        .forEach((user) => {
          io.to(user.socketID).emit("messageResponse", data);
        });
    });

    socket.on("disconnect", () => {
      console.log(`🔥: User ${socket.id} disconnected`);
      // Updates the list of users when a user disconnects from the server
      users = users.filter((user) => user.socketID !== socket.id);
      io.emit("newUserResponse", users);
    });
  });
};
