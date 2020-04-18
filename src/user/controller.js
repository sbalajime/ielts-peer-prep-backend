const bcrypt = require('bcrypt');
let {getUserModel, getUserByIDModel, postUserModel}= require('./model');

const getUser = (req, res) => {
    getUserModel(req, res)
}


const getUserById = (req, res) => {
    getUserByIDModel(req, res)
}

const postUser = (req, res) => {
    console.log('rounds', process.env.SALT_ROUNDS)
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUNDS));
    req.body.password = bcrypt.hashSync(req.body.password, salt);
    postUserModel(req, res)
}

module.exports = {getUser, getUserById, postUser};