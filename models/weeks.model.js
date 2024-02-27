const model = require("./Week.js");
const teamModel = require("./Team.js");

async function getWeeksByTeamId(id) {
  const result = await model.Week.find({ id });
  return result;
}

async function createWeek(weekData) {
  const { season, weekName, map, weekdays, teamId } = weekData;
  const Week = new model.Week({
    season,
    weekName,
    map,
    weekdays,
    teamId,
  });
  const result = await Week.save();
  return result;
  // //Add week to team
  // const team = await teamModel.Team.findById(id);
  // if (team) {
  //   team.weeks.push(result._id);
  //   await team.save();
  // } else {
  //   throw new Error("Team not found");
  // }
}

async function getWeek(id) {
  const result = await model.Week.findById(id);
  return result;
}

async function editWeek(id, weekData) {
  const result = await model.Week.findByIdAndUpdate(id, weekData, {
    new: true,
  });
  return result;
}

async function deleteWeek(id) {
  const result = await model.Week.findByIdAndDelete(id);
  return result;
}

module.exports = {
  getWeeksByTeamId,
  createWeek,
  getWeek,
  editWeek,
  deleteWeek,
};
