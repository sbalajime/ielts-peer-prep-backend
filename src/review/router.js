var express = require('express')
var router = express.Router()
var { postReview } = require('./controller');

router.post('/', postReview);

module.exports = router