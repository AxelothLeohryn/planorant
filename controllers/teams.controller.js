const model = require("../models/teams.model.js");

const createTeam = async (req, res) => {
  const teamData = req.body;
  try {
    await model.createTeam(teamData);
    res.status(201).json({ message: "Team created" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating team", error: error.message });
  }
};

const editTeam = async (req, res) => {
  const id = req.params.id;
  const teamData = req.body;
  try {
    await model.editTeam(id, teamData);
    res.status(201).json({ message: "Team edited" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing team", error: error.message });
  }
};

const getTeam = async (req, res) => {
  const id = req.params.id;
  try {
    const team = await model.getTeam(id);
    res.status(200).json(team);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting team", error: error.message });
  }
};

const deleteTeam = async (req, res) => {
  const id = req.params.id;
  try {
    await model.deleteTeam(id);
    res.status(200).json({ message: "Team deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting team", error: error.message });
  }
};

module.exports = {
  createTeam,
  editTeam,
  getTeam,
  deleteTeam,   
};
