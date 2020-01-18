  
const mongoose = require('mongoose');

var roundSchema = new mongoose.Schema ({
  id: {
    type: String
  },
  user_id: {
    type: String
  },
  course: {
    type: String,
    default: false
  },
  score: {
    type: Number,
    default: false
  },
  fairways_in_reg: {
    type: Number,
    default: false
  },
  greens_in_reg: {
    type: Number,
    default: false
  },
  total_putts: {
    type: Number,
    default: false
  },
  total_birdies: {
    type: Number,
    default: false
  },
  total_pars: {
    type: Number,
    default: false
  },
  date: {
    type: Date,
    default: false
  }
});

var PlayerRound = mongoose.model('PlayerRound', roundSchema);
module.exports = PlayerRound;
