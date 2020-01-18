const express = require('express');
const router = express.Router();
const helper = require('../helpers/app');


router.route('/')
.post(helper.createRound)

router.route('/rounds')
.get(helper.getRounds)


module.exports = router;