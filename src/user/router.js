var express = require('express')
var router = express.Router()
var { getUser, getUserById, postUser, loginUser } = require('./controller');



router.get('/', getUser)
router.get('/id', getUserById)
router.post('/', postUser)
router.put('/login', loginUser)

module.exports = router