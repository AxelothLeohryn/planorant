const mongoose = require("mongoose");
const cron = require("node-cron");

const MessageSchema = new mongoose.Schema({
  text: { type: String, required: true },
  username: { type: String, required: true },
  image: { type: String },
  senderId: { type: String, required: true },
  teamId: { type: String, required: true },
  time: { type: Date, default: Date.now, required: true },
});

const Message = mongoose.model("Message", MessageSchema);

// Function to trim messages for each team
async function trimMessages() {
  console.log('Running cleanup task...');
  // Get a list of unique teamIds from messages
  const teamIds = await Message.distinct("teamId");

  for (const teamId of teamIds) {
    // Get the total count of messages for the team
    const messagesCount = await Message.countDocuments({ teamId });
    if (messagesCount > 50) {
      // Find the 50th most recent message's time for this team
      const cutoffMessage = await Message.find({ teamId })
        .sort({ time: -1 }) // Sort by time descending (most recent first)
        .skip(49) // Skip the first 49 messages
        .limit(1); // Take the next one (50th message)
      
      if (cutoffMessage.length > 0) {
        // Remove messages older than the 50th message
        await Message.deleteMany({
          teamId,
          time: { $lt: cutoffMessage[0].time }
        });
      }
    }
  }
}

// Schedule the cleanup task to run periodically (e.g., every hour)
cron.schedule('0 * * * *', trimMessages);

module.exports = Message;