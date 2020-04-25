const jwt = require('jsonwebtoken');
var { postModelEssay, getModelEssay, getModelEssayById } = require('./model')

const postEssay = (req, res) => {
    postModelEssay(req, res);
}


const getEssay = (req, res) => {
    getModelEssay(req, res)
}


const getEssayById = (req, res) => {
    getModelEssayById(req, res)

}



module.exports = { postEssay, getEssay, getEssayById }