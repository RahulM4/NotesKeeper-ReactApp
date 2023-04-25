//// connect to mongodb
const connecttoMongo = require("./db");
const express = require("express");
var cors = require('cors')
connecttoMongo();

// set up express
const app = express();
// port number for the server
const port = 5000;
//cors 
app.use(cors())
//Init Middleware
app.use(express.json());

//Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

// This is a test route
app.get("/", (req, res) => {
  res.send("Welcome to Express JS");
});
//app is listening on port 5000 for requests
app.listen(port, () => {
  console.log(`NotesKeeeper app is listening on port ${port}`);
});
