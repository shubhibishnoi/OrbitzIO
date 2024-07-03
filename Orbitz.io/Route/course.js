const express = require("express");
const router = express.Router();

const controller = require('../Controller/course');//Requring Controlle

const { isLogedIn, auth } = require('../Middleware/auth.js');//Requring Middleware isLogedIn


router.get("/", isLogedIn, controller.allCourse);

router.get("/addNewCourse", auth, isLogedIn, controller.addNewPage);

router.post("/addNewCourse", auth, controller.addNew);

router.post("/join", auth, controller.join);

router.get("/myCourses", auth, isLogedIn, controller.myCourses);

router.get("/:courseID", isLogedIn, auth, controller.indiCourse);


module.exports = router;
