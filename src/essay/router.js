var express = require('express')
var router = express.Router();
var { postEssay, getEssay, getEssayById } = require('./controller')



router.post('/', postEssay);

router.get('/', getEssay);

router.get('/:id', getEssayById);




module.exports = router