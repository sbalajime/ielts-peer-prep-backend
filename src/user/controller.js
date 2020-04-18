const bcrypt = require('bcrypt');
let {getUserModel, getUserByIDModel, postUserModel}= require('./model');

const getUser = (req, res) => {
    getUserModel(req, res)
}


const getUserById = (req, res) => {
    getUserByIDModel(req, res)
}

const postUser = (req, res) => {
    const salt = bcrypt.genSaltSync(10);
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    postUserModel(req, res)
}

module.exports = {getUser, getUserById, postUser};