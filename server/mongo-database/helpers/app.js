const db = require('../models/round');

exports.createRound = function(req, res) {
  db.PlayerRound.create(req.body)
  .then(function(round){
    console.log('Round created....', round)
  })
  .catch(function(err) {
    res.send(err);
  });
}

exports.getRounds =  function(req, res) {
  db.PlayerRound.find()
  .then(function(round) {
    console.log('Geting round...', round);
  })
  .catch(function(err){
    res.send(err);
  });  
}

module.exports = exports;