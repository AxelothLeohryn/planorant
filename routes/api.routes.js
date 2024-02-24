const express = require("express");
const router = express.Router();

const teamsController= require("../controllers/teams.controller.js");
const weeksController= require("../controllers/weeks.controller.js");
const playersController= require("../controllers/players.controller.js");


//Team Routes
router.get("/team/:id", teamsController.getTeam);
router.post("/team/create", teamsController.createTeam);
router.put("/team/edit/:id", teamsController.editTeam);
router.delete("/team/delete/:id", teamsController.deleteTeam);

//Week Routes
router.get("/team/:id/weeks", weeksController.getWeeksByTeamId);
router.get("/week/:id", weeksController.getWeek);
router.post("/week/create", weeksController.createWeek);
router.put("/week/edit/:id", weeksController.editWeek);
router.delete("/week/delete/:id", weeksController.deleteWeek);

//Player Routes
// router.get("/player/:id", playersController.getPlayer);
router.post("/player/create", playersController.createPlayer);
// router.put("/player/add/:id", playersController.addPlayer);
// router.put("/player/edit/:id", playersController.editPlayer);
// router.delete("/player/delete/:id", playersController.deletePlayer);



module.exports = router;