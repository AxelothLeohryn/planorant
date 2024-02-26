const model = require("./Team.js");

async function createTeam(teamData) {
  const { name, players } = teamData;
  const Team = new model.Team({
    name,
    players,
  });
  const result = await Team.save();
  return result;
}

async function editTeam(id, teamData) {
  const result = await model.Team.findByIdAndUpdate(id, teamData, {
    new: true,
  });
  return result;
}

async function getTeam(id) {
    try {
        const result = await model.Team.findById(id);
        return result;
    } catch (error) {
        throw new Error("Team not found");
    }
}

async function deleteTeam(id) {
  const result = await model.Team.findByIdAndDelete(id);
  return result;
}

module.exports = { createTeam, editTeam, getTeam, deleteTeam };
