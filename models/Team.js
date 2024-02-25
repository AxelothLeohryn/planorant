const mongoose = require("../config/mongodb.js");

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  players: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Player",
    },
  ],
  weeks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Week",
    },
  ],
  key: {
    type: String,
    required: true,
    default: () => Math.random().toString(36).substring(2, 7),
  },
  
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = { Team };
