var express = require('express')
var router = express.Router();
var {postEssay} = require('./controller') 



router.post('/' , postEssay);





module.exports = router