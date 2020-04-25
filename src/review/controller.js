const jwt = require('jsonwebtoken');
var { postReviewModal } = require('./model')

const postReview = (req, res) => {
    console.log('post review controller')
    postReviewModal(req, res);
}


module.exports = { postReview }