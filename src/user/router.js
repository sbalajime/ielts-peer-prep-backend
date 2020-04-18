var express = require('express')
var router = express.Router()
var {getUser, getUserById, postUser}  = require('./controller');



router.get('/',getUser)
router.get('/:id',getUserById)
router.post('/',postUser)

module.exports = router