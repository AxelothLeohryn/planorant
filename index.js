require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const path = require("path");
const http = require("http").Server(app);

//Socket.io 
const setupSocketIO = require("./socket.js");

var cors = require("cors");
const morgan = require("morgan");

require("./config/mongodb.js");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan("dev"));

//Routes
const apiRoutes = require("./routes/api.routes.js");

//Socket.io
setupSocketIO(http);

app.use("/api", apiRoutes);

//* Serve static assets in production, must be at this location of this file
if (process.env.NODE_ENV === "production") {
  //*Set static folder (VITE --> dist)
  app.use(express.static("client/dist"));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"))
  );
}

http.listen(PORT, () => {
  console.log(`Planorant Backend is running on port ${PORT}`);
});
