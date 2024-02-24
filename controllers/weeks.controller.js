const model = require("../models/weeks.model.js");

const getWeeksByTeamId = async (req, res) => {
  const id = req.params.id;
  try {
    const weeks = await model.getWeeksByTeamId(id);
    res.status(200).json(weeks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting weeks", error: error.message });
  }
};

const createWeek = async (req, res) => {
  const weekData = req.body;
  try {
    await model.createWeek(weekData);
    res.status(201).json({ message: "Week created and added to team" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating week", error: error.message });
  }
};

const getWeek = async (req, res) => {
  const id = req.params.id;
  try {
    const week = await model.getWeek(id);
    res.status(200).json(week);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting week", error: error.message });
  }
};

const editWeek = async (req, res) => {
  const id = req.params.id;
  const weekData = req.body;
  try {
    await model.editWeek(id, weekData);
    res.status(201).json({ message: "Week edited" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error editing week", error: error.message });
  }
};

const deleteWeek = async (req, res) => {
  const id = req.params.id;
  try {
    await model.deleteWeek(id);
    res.status(200).json({ message: "Week deleted" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting week", error: error.message });
  }
};

module.exports = {
  getWeeksByTeamId,
  createWeek,
  getWeek,
  editWeek,
  deleteWeek,
};
