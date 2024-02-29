const mongoose = require("mongoose");

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true }, // Username of the sender
  image: { type: String }, // Image of the sender
  senderId: { type: String, required: true }, // User ID (senderId from the message object)
  teamId: { type: String, required: true }, // Team ID
  time: { type: String, required: true }, // Timestamp of the message
});

const Message = mongoose.model("Message", MessageSchema);

module.exports = Message;