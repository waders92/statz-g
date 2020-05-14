const Course = require('../models/course.model');

exports.create = (req, res) => {
  const course = buildCourse(req);
  saveCourse(res, course);
}

function buildCourse(req) {
  const holes = req.body.holes;
  return new Course({
    courseName: req.body.courseName,
    state: req.body.state,
    holes: [holes]
  });
}

function saveCourse(res, course) {
  course.save()
  .then(data => {
      res.send(data);
  }).catch(err => {
      sendErrorMessage(res, err);
  });
}

function sendErrorMessage(res, e) {
  res.status(500).send({
      message: e.message || "Something wrong while interacting with courses."
  });
}