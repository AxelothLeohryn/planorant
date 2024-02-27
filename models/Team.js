const mongoose = require("../config/mongodb.js");

const generateKey = () => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < 6; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    required: true,
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
    default: generateKey,
    unique: true,
  },
});

// Pre-save middleware to check for key uniqueness with an attempt limit
TeamSchema.pre("save", async function (next) {
  const maxAttempts = 10; // Maximum number of attempts to find a unique key
  let attempts = 0;

  if (this.isNew || this.isModified("key")) {
    while (true) {
      const existingTeam = await Team.findOne({ key: this.key });
      if (!existingTeam) break; // Unique key found

      if (attempts >= maxAttempts) {
        // If max attempts reached without finding a unique key, throw an error
        throw new Error(
          "Failed to generate a unique team key after multiple attempts."
        );
      }

      this.key = generateKey(); // Generate a new key and check again
      attempts++;
    }
  }
  next();
});

const Team = mongoose.model("Team", TeamSchema);

module.exports = { Team };
