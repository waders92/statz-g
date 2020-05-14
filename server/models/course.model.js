const mongoose = require('mongoose');

const holeSchema = new mongoose.Schema({
  number: String,
  yardage: String,
  par: String
})

const courseSchema = new mongoose.Schema({
  courseName: String,
  state: String,
  holes: [holeSchema]
})

const NewCourse = mongoose.model('NewCourse', courseSchema);
module.exports = NewCourse;
