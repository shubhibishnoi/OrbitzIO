const session = require('express-session');
const passport = require('passport');

const User = require("../Model/user");

exports.auth = async (req, res) => {
  res.render("auth", {isLogedIn: req.isLogedIn});
};

//Login Controller
exports.login = async (req, res) => {

  //Getting User Detail from body of post request
  const user = await new User({
    username: req.body.username,
    password: req.body.password
  });

  //Passport Login Function
  req.login(user, (err) => {
    if(err){
      res.status(400).send(err);
    }else{
      passport.authenticate("local")(req, res, () => {
          res.redirect("/");//Redirection to Home after successfull login
      });
    }
  });
}

//Register Controller
exports.register = async (req, res) => {

  //Getting User Detail from body of post request
  const reqUser = {
    name: req.body.name,
    username: req.body.username,
    password: req.body.password
  }

  //Passport register Function
  await User.register({username: reqUser.username}, reqUser.password, (err, user) => {
    if(err){
      res.status(400).send(err);
    }else{

      //Adding extra information in USER
      user.name = reqUser.name;
      user.save();

      passport.authenticate("local")(req, res, () => {
          res.redirect("/");//Redirection to Home after successfull Registration
      });
    }
  });
}

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
