var mongoose = require('mongoose');
var dbUrl = 'mongodb://127.0.0.1/statz-g';
mongoose.set('debug', true);
mongoose.connect(dbUrl);

mongoose.Promise = Promise;

module.exports.PlayerScore = require('./models/round');