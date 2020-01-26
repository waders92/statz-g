module.exports = (app) => {
  const rounds = require('../controllers/round.controller');

  app.post('/rounds', rounds.create);

  app.get('/rounds', rounds.findAll);

  app.get('/rounds/:roundId', rounds.findOne);

  app.put('/rounds/:roundId', rounds.update);

  // app.delete('/rounds/:roundId', rounds.delete);
}