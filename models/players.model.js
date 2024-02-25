const model = require("./Player.js");

async function createPlayer(playerData) {
  const { username, email } = playerData;
  const Player = new model.Player({
    username,
    email,
  });
  const result = await Player.save();
}

module.exports = { createPlayer };
