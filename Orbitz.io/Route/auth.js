const express = require("express");
const router = express.Router();

const controller = require('../Controller/auth');//Requring Controllers

const { isLogedIn, auth } = require('../Middleware/auth.js');//Requring Middleware isLogedIn

//Rendring login&Register Page
router.get("/", isLogedIn, controller.auth);

//Login Route in /auth
router.post("/login", controller.login);

//Register Route in /auth
router.post("/register", controller.register);

router.get("/logout", controller.logout);

module.exports = router;
