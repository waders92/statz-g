module.exports = (app) => {
  const courses = require('../controllers/course.controller');

  app.post('/courses', courses.create);
}