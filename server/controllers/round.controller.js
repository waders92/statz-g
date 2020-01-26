const Round = require('../models/round.model');


exports.create = (req, res) => {
    if(!req.body) {
        return res.status(400).send({
            message: "Round content can not be empty"
        });
    }

    const round = new Round({
      userId: req.body.userId,
      course: req.body.course,
      score: req.body.score,
      fairwaysInReg: req.body.fairwaysInReg,
      greensInReg: req.body.greensInReg,
      totalPutts: req.body.totalPutts,
      totalBirdies: req.body.totalBirdies,
      totalPars: req.body.totalPars,
      date: req.body.date
    });

    // Save round in the database
    round.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        sendErrorMessage(res, err);
    });
};

// Retrieve all rounds from the database.
exports.findAll = (req, res) => {
  Round.find()
  .then(rounds => {
      res.send(rounds);
  }).catch(err => {
    sendErrorMessage(res, err);
  });
};

exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "ROund content can not be empty"
        });
    }

    // Find and update product with the request body
    Round.findByIdAndUpdate(req.params.roundId, {
        id: req.body.id,
        userId: req.body.userId,
        course: req.body.course,
        score: req.body.score,
        fairwaysInReg: req.body.fairwaysInReg,
        greensInReg: req.body.greensInReg,
        totalPutts: req.body.totalPutts,
        totalBirdies: req.body.totalBirdies,
        totalPars: req.body.totalPars,
        date: req.body.date
    }, {new: true})
    .then(round => {
        if(!round) {
            return res.status(404).send({
                message: "Round not found with id " + req.params.roundId
            });
        }
        res.send(round);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Round not found with id " + req.params.roundId
            });                
        }
        return res.status(500).send({
            message: "Something wrong updating round with id " + req.params.roundId
        });
    });
};

exports.findOne = (req, res) => {
    Round.findById(req.params.roundId)
    .then(round => {
        if(!round) {
            return res.status(404).send({
                message: "Round not found with id " + req.params.roundId
            });            
        }
        res.send(round);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Round not found with id " + req.params.roundId
            });                
        }
        return res.status(500).send({
            message: "Something wrong retrieving round with id " + req.params.roundId
        });
    });
};

function sendErrorMessage(res, e) {
    res.status(500).send({
        message: e.message || "Something wrong while interacting with rounds."
    });
}