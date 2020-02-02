module.exports = (app) => {
  const rounds = require('../controllers/round.controller');

  app.post('/rounds', rounds.create);

  app.get('/rounds', rounds.findAll);

  app.put('/rounds/:roundId', rounds.update);

}