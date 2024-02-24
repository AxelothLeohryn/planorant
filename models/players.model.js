const model = require("./Player.js");

async function createPlayer(playerData) {
  const { username } = playerData;
  const Player = new model.Player({
    username,
  });
  const result = await Player.save();
}

module.exports = { createPlayer };