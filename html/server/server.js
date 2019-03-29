const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('../pages'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/scores', {
  useNewUrlParser: true
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const scores = require("./scores.js");
app.use("/api/scores", scores);
const users = require("./users.js");
app.use("/api/users", users);

app.listen(4000, () => console.log('Server listening on port 4000!'));
