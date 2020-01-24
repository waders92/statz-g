const mongoose = require('mongoose');

var roundSchema = new mongoose.Schema ({
  userId: String,
  course: String,
  score: Number,
  fairwaysInReg: Number,
  greensInReg: Number,
  totalPutts: Number,
  totalBirdies: Number,
  totalPars: Number,
  date: Date
}, {
  timestamps: true
});

var PlayerRound = mongoose.model('PlayerRound', roundSchema);
module.exports = PlayerRound;
