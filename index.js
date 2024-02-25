require("dotenv").config();
const express = require("express");
var cors = require('cors');
const morgan = require("morgan");

const app = express();
const PORT = process.env.PORT || 5000;
require("./config/mongodb.js"); 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//Routes
const apiRoutes = require("./routes/api.routes.js");
const userRoutes = require("./routes/user.routes.js");

app.use("/api", apiRoutes);
// app.use("/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Planorant Backend is running on port ${PORT}`);
});
