const express = require("express");
const cors = require("cors");
const cookieParser = require('cookie-parser');
const setupDatabase = require("./src/repo/create_tables");
const { selectUserByPesel, insertUser } = require("./src/repo/user_repository")
const { insertReview } = require("./src/repo/review_repository")


const json1 = {
  pesel: "12345678901",
  email: "example1@example.com",
  name: "John",
  role: "ADMIN",
  surname: "Doe",
  password: "password123",
  height: 180,
  weight: 75,
  education: 3,
  address: "123 Main St",
  city: "Wrocław",
  zipCode: "50-000"
};

const json2 = {
  pesel: "98765432109",
  email: "example2@example.com",
  name: "Jane",
  role: "USER",
  surname: "Smith",
  password: "securepassword",
  height: 165,
  weight: 60,
  education: 2,
  address: "456 Elm St",
  city: "Wrocław",
  zipCode: "51-000"
};

const json3 = {
  pesel: "54321098765",
  email: "example3@example.com",
  name: "David",
  role: "USER",
  surname: "Johnson",
  password: "pass123",
  height: 175,
  weight: 80,
  education: 3,
  address: "789 Oak St",
  city: "Wrocław",
  zipCode: "52-000"
};

const json4 = {
  subject: "12345678901",
  author: "54321098765",
  rating: 9,
  description: "Good friend!"
}

const json5 = {
  subject: "12345678901",
  author: "98765432109",
  rating: 7,
  description: "Good at cooking!"
}


const database = async () => {
  await setupDatabase()
  await insertUser(json1)
  await insertUser(json2)
  await insertUser(json3)
  await insertReview(json4)
  await insertReview(json5)
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