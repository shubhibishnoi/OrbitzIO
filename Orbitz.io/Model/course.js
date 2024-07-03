const mongoose = require("mongoose");


const courseSchema = new mongoose.Schema({
  createrID: {
    type: String,
    required: true
  },
  title: String,
  des: String,
  joinedUsersID: {
    type: Array,
    default: []
  },
  topics: {
    type: [Object]
  }
});

const Course = mongoose.model("Course", courseSchema);//Building Course Model

module.exports = Course;
