module.exports = (app) => {
  const users = require('../controllers/user.controller');

  app.post('/users', users.create);
  app.post('/users/login', users.login);

  // app.get('/users/:userId', users.findOne);

}