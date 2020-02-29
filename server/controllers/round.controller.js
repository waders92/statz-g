const Round = require('../models/round.model');
const roundNotFoundWithId = "Round not found with id ";
const noEmptyRoundContent = "Round content can not be empty";

exports.create = (req, res) => {
    if(!req.body) {
        noEmptyContent(res, 400, noEmptyRoundContent);
    }

    const round = buildRound(req);
    saveRound(res, round)
};

exports.findAll = (req, res) => {
    findAllRounds(req, res);
};

exports.update = (req, res) => {
    if(!req.body) {
        noEmptyContent(res, 400, noEmptyRoundContent);
    }

    findRoundByIdAndUpdate(req, res);
};

function buildRound(req) {
  return new Round({
     userId: req.body.userId,
     course: req.body.course,
     score: req.body.score,
     fairwaysInReg: req.body.fairwaysInReg,
     greensInReg: req.body.greensInReg,
     totalPutts: req.body.totalPutts,
     totalBirdies: req.body.totalBirdies,
     totalPars: req.body.totalPars,
     date: req.body.date,
     nineHoleRound: req.body.nineHoleRound
    });
}

function sendErrorMessage(res, e) {
    res.status(500).send({
        message: e.message || "Something wrong while interacting with rounds."
    });
}

function noEmptyContent(res, statusCode, message) {
    return res.status(statusCode).send({
        message: message
    });
}

function sendStatusMessage(res, statusCode, message) {
    return res.status(statusCode).send({
        message: message + req.params.roundId
    });
}

function saveRound(res, round) {
    round.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        sendErrorMessage(res, err);
    });
}

function findAllRounds (req, res) {
    const id = req.params.userId;
    Round.find({userId: id})
    .then(rounds => {
        res.send(rounds);
    }).catch(err => {
      sendErrorMessage(res, err);
    });
}

function findRoundByIdAndUpdate(req, res) {
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
        date: req.body.date,
        nineHoleRound: req.body.nineHoleRound
    }, {new: true})
    .then(round => {
        if(!round) {
            sendStatusMessage(res, 404);
        }
        res.send(round);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            sendStatusMessage(res, 404, roundNotFoundWithId);                
        }
            sendStatusMessage(res, 500, roundNotFoundWithId);
    });
}