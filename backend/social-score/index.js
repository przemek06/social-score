const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const setupDatabase = require("./src/repo/create_tables");
const { selectUserByPesel, insertUser } = require("./src/repo/user_repository")


const database = async () => {
  await setupDatabase()
  await insertUser({pesel: "11122233344", role: "ADMIN", password: "pass"})

}
// initialize database
database()

const app = express();
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
}));
app.use(express.urlencoded({ extended: true }));

require("./src/start/routes")(app);

app.use(function(err, req, res, next) {
  res.status(500).send(err);
})

const port = process.env.PORT || 5000;
let server;

server = app.listen(port, () =>
  console.log(`Listening on port ${port}...`)
);

module.exports = server;