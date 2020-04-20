var {postModelEssay} = require('./model')

postEssay = (req ,res) => {

    postModelEssay(req,res)

}



module.exports = {postEssay}