const express = require('express')
const router = express.Router()
const itemController = require('../controller/item')
const authController = require('../controller/authentication')
const customerController = require('../controller/customer')

/* customer */
router.post('/customer', customerController.createCustomerInfo)
router.put('/customer', customerController.updateCustomerInfo)
router.get('/customer', customerController.getCustomerInfo)
router.delete('/customer', customerController.deleteCustomer)

// melihat daftar user
router.get('/users', authController.verifyToken, authController.findAll)

router.post('/signin', authController.signIn)

router.post('/signup', authController.signUp)

// melihat daftar barang yang hilang
router.get('/list', authController.verifyToken , itemController.getAllData)

module.exports = router
