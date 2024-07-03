const Course = require("../Model/course");


exports.allCourse = async (req, res) => {

  await Course.find((err, foundCourses) => {
    res.render("allCourse", {courses: foundCourses, isLogedIn: req.isLogedIn});
  }).clone();

};

exports.addNewPage = async (req, res) => {
  res.render("addNewCourse", {isLogedIn: req.isLogedIn});
};

exports.addNew = async (req, res) => {

  //Logic to add dynamic number of Topics
  let topicsArr = [];
  for (i = 1; i <= req.body.noOfTopics; i++) {

    let newTopic = {
      title: req.body[`t${i}Title`],
      des: req.body[`t${i}Des`],
      link: req.body[`t${i}Link`]
    }

    topicsArr.push(newTopic); //adding newTopic to array
  }

  const newCourse = await new Course({
    createrID: req.user._id,
    title: req.body.title,
    des: req.body.des,
    topics: topicsArr
  });

  newCourse.save((err) => {
    if(!err){
      res.redirect("/")
    }
  });

};


exports.join = async (req, res) => {
  const courseID = req.body.courseID;

  await Course.findOne({_id: courseID}, (err, foundCourse) => {
    if(!foundCourse.joinedUsersID.includes(req.user._id)){
      foundCourse.joinedUsersID.push(req.user._id);
    }
    foundCourse.save((err) => {
      if(!err){
        res.redirect(`/course/${foundCourse._id}`);
      }
    });
  }).clone();
}

exports.myCourses = async (req, res) => {
  let userJoinedCourses = [];
  await Course.find({}, (err, foundCourses) => {
    for(course of foundCourses){
      if(course.joinedUsersID.includes(req.user._id)){
        userJoinedCourses.push(course);
      }
    }

    res.render("myCourses", {courses: userJoinedCourses, isLogedIn: req.isLogedIn});
  }).clone();
}

exports.indiCourse = async (req, res) => {
  const courseID = req.params.courseID;

  await Course.findOne({_id: courseID}, (err, foundCourse) => {
    let courseJoined = false;
    if(foundCourse.joinedUsersID.includes(req.user._id)){
      courseJoined = true;
    }

    res.render("indiCourse", {course: foundCourse, courseJoined, isLogedIn: req.isLogedIn});
  }).clone();
}
