const mongoose = require("mongoose");
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");//Function for storing USER in local Database

//Creating User Schema
const userSchema = new mongoose.Schema({
  name: String,
});

userSchema.plugin(passportLocalMongoose);//Enabling passport-local-mongoose

const User = mongoose.model("User", userSchema);//Building User Model

passport.use(User.createStrategy());//Creating Local Strategy

//Serializing & deserializing for storing USER in session Successfully
passport.serializeUser(function (user, done) {
  done(null, user.id);
});
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

module.exports = User;
