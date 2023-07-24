//jshint esversion:6
require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const User = require("./models/users");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));

mongoose
  .connect("mongodb://127.0.0.1:27017/userDB", { useNewUrlParser: true })
  .then(() => {
    console.log("Connection Successful");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.get("/", function (req, res) {
  res.render("home");
});

app.get("/login", function (req, res) {
  res.render("login");
});

app.get("/register", function (req, res) {
  res.render("register");
});

app.post("/register", function (req, res, next) {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  try {
    newUser.save();
    res.render("secrets");
  } catch (err) {
    next(err);
  }
});

app.post("/login", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const foundUser = await User.findOne({ email: username });

    if (foundUser) {
      if (foundUser.password === password) {
        res.render("secrets");
      } else {
        res.status(401).send("Incorrect password");
      }
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, function () {
  console.log("Server running on PORT 3000");
});
