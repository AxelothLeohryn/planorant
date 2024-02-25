const mongoose = require("../config/mongodb.js");

const PlayerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  team: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
  weeks: [
    {
      week: { type: mongoose.Schema.Types.ObjectId, ref: "Week" },
      availableTHU: {
        type: Boolean,
      },
      availableSAT: {
        type: Boolean,
      },
      availableSUN: {
        type: Boolean,
      },
      agents: {
        type: [String],
      },
    },
  ],
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = { Player };
