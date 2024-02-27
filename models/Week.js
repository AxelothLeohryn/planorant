const mongoose = require("../config/mongodb.js");

const WeekSchema = new mongoose.Schema({
  season: {
    type: String,
  },
  weekName: {
    type: String,
  },
  map: {
    type: String,
    required: true,
  },
  weekdays: {
    thursday: {
      type: String,
    },
    saturday: {
      type: String,
    },
    sunday: {
      type: String,
    },
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Team",
  },
});
const Week = mongoose.model("Week", WeekSchema);

module.exports = { Week };
