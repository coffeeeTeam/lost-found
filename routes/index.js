var express = require('express')
var router = express.Router()
var authController = require('../controller/authentication.js')

/* GET home page. */

router.get('/', function (req, res) {
  res.send('please sign in use /signin')
})

// melihat daftar user
router.get('/users', authController.verifyToken, authController.findAll)

router.post('/signin', authController.signIn)

router.post('/signup', authController.signUp)

module.exports = router
