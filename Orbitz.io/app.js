require("dotenv").config();//Used to read .env file
const express = require("express");//Server
const bodyParser = require("body-parser");//Used to get detail of body from post request
const ejs = require("ejs");//View Engine
const mongoose = require('mongoose');//ODM for MongoDB
const session = require('express-session');//Used to access session storage
const passport = require('passport');//Used for authentication

//PORT Declaration
const port = process.env.PORT || 3000;

// Routers
const indexRouter = require("./Route/index");//Index Route
const authRouter = require("./Route/auth");//Auth Route
const courseRouter = require("./Route/course");//Course Route

const app = express();//Creating App Server
app.use(express.json());//Enabling JSON Format

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//Enabling User Storing
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false
}));


//initializing Passport
app.use(passport.initialize());
app.use(passport.session());

//Connecting Database
mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

// Using Routes
app.use("/", indexRouter);//Using index Route on '/'
app.use("/auth", authRouter);//Using auth Route on '/auth'
app.use("/course", courseRouter);//Using auth Route on '/course'

//Starting Server
app.listen(port, () => {
  console.log(`Server is running at port ${port}...`);
});
