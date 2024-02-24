const model = require("../models/players.model.js");

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

module.exports = { createPlayer };
