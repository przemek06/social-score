const express = require("express");
const cors = require("cors");
const setupDatabase = require("./src/repo/create_tables");
const { selectUserByPesel } = require("./src/repo/user_repository")

const database = async () => {
  await setupDatabase()

}
 // initialize database
database()

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: true }));

require("./src/start/routes")(app);

app.use(function(err, req, res, next) {
  res.status(500).send(res.sentry);
})

const port = process.env.PORT || 5000;
let server;

server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;