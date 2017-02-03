var express = require('express')
var router = express.Router()
var itemController = require('../controller/item')

/* GET home page. */
router.get('/list', itemController.getAllData)

module.exports = router
