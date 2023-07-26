require('dotenv').config()
const mongoose = require("mongoose");
const md5 = require("md5");
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new mongoose.Schema({
  email: String,
  password: String
});

userSchema.plugin(passportLocalMongoose);

// userSchema.plugin(encrypt, { secret: process.env.SECRET, encryptedFields: ["password"] });

module.exports = mongoose.model("User", userSchema);
