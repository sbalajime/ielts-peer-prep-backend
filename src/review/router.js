var express = require('express')
var router = express.Router()
var { postReview, getReviewById } = require('./controller');


router.get('/:id', getReviewById)
router.post('/', postReview);

module.exports = router