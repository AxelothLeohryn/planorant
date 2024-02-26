const model = require("./Player.js");

async function createPlayer(playerData) {
  const { username, email } = playerData;
  const Player = new model.Player({
    username,
    email,
  });
  const result = await Player.save();
}

async function getPlayerById(id) {
  const player = await model.Player.findById(id);
  return player;
}

async function getPlayerByUsername(username) {
  const player = await model.Player.findOne({ username});
  return player;
}

async function editPlayer(id, playerData) {
  const result = await model.Player.findByIdAndUpdate(id, playerData, {
    new: true,
  });
  return result;
}

module.exports = { createPlayer, getPlayerById, getPlayerByUsername, editPlayer };
