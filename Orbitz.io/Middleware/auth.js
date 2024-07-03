//Middleware for checking if user is logedin or not
function auth(req, res, next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect("/auth");//Redirecting to auth if User not logedin
  }
}

//Middleware for returing the user logedin state
function isLogedIn(req, res, next){
  if(req.isAuthenticated()){
    req.isLogedIn = true;
  }else{
    req.isLogedIn = false;
  }
  next();
}


module.exports = {auth, isLogedIn};
