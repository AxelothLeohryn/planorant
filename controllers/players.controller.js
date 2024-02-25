const model = require("../models/players.model.js");
const playerModel = require("../models/Player.js");

const checkLogin = async (req, res) => {
  const { email } = req.body;
  try {
    let player = await playerModel.Player.findOne({ email });
    if (player) {
      // Inform the frontend that this is a not a new user, to login as usual
      res.json({ isNewUser: false, username: player.username});
    } else {
      // Inform the frontend that this is a new user, prompt to create username
      res.json({ isNewUser: true });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error checking login", error: error.message });
  }
};

const createPlayer = async (req, res) => {
  const playerData = req.body;
  try {
    await model.createPlayer(playerData);
    res.status(201).json({ message: "Player created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating player", error: error.message });
  }
};

module.exports = { checkLogin, createPlayer };
