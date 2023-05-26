const express = require("express");
const cors = require("cors");
const setupDatabase = require("./src/repo/create_tables");


// initialize database
setupDatabase()

require('dotenv').config()

const app = express();

app.use(cors());

app.get('/', function (req, res) {
  res.send('Hello World');
})
//require("./src/start/routes")(app);

app.use(function(err, req, res, next) {
  res.status(500).send(res.sentry);
})

const port = process.env.PORT || 5000;
let server;

server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;