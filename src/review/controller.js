const jwt = require('jsonwebtoken');
var { postReviewModal, getReviewByIdModal } = require('./model')

const postReview = (req, res) => {
    console.log('post review controller')
    postReviewModal(req, res);
}


const getReviewById = (req, res) => {
    getReviewByIdModal(req, res);
}


module.exports = { postReview, getReviewById }