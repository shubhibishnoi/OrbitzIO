const express = require("express");
const router = express.Router();

const controller = require('../Controller/index');//Requring Controllers

const { isLogedIn } = require('../Middleware/auth.js');//Requring Middleware isLogedIn

//Home Route
router.get("/", isLogedIn, controller.home);

module.exports = router
