const mongoose = require("mongoose");
const uri = process.env.URI_WITH_PASSWORD

mongoose.connect(uri);

const db = mongoose.connection;

db.on("error", error => console.log(error));
db.once("open", () => console.log("Connected to MongoDBAtlas!"));

module.exports = mongoose;