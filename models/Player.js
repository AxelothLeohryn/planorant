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
  image: {
    type: String,
  },
});

PlayerSchema.pre("save", function (next) {
  // Only set the image if it's not already set and the username is provided
  if (!this.image && this.username) {
    this.image = `https://placehold.co/400x400/232323/bd3944?text=${this.username.charAt(0) + this.username.charAt(1)}`;
  }
  next();
});

const Player = mongoose.model("Player", PlayerSchema);

module.exports = { Player };
