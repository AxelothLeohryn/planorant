const model = require("./Team.js");

async function createTeam(teamData) {
  const { name, tag, players } = teamData;
  const Team = new model.Team({
    name,
    tag,
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

async function getTeamByInviteCode(key) {
  const team = await model.Team.findOne({ key });
  return team;
}


module.exports = { createTeam, editTeam, getTeam, deleteTeam, getTeamByInviteCode };
