var express = require('express')
var router = express.Router()
var itemController = require('../controller/item')

var authController = require('../controller/authentication')

// melihat daftar user
router.get('/users', authController.verifyToken, authController.findAll)

router.post('/signin', authController.signIn)

router.post('/signup', authController.signUp)


// melihat daftar barang yang hilang
router.get('/list', itemController.getAllData)


module.exports = router
