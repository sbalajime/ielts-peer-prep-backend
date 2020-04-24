const jwt = require('jsonwebtoken');
var { postModelEssay, getModelEssay, getModelEssayById } = require('./model')

const postEssay = (req, res) => {
    const { authorization } = req.headers
    jwt.verify(authorization, 'testsecret', (err, decoded) => {
        if (err)
            res.status(500).send({ status: "failed", msg: "Invalid Login" })
        else {
            req.id = decoded.data.id
            postModelEssay(req, res)
        }
    })



}


const getEssay = (req, res) => {

    getModelEssay(req, res)
}


const getEssayById = (req, res) => {
    getModelEssayById(req, res)

}



module.exports = { postEssay, getEssay, getEssayById }