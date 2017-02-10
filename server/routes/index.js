const express = require('express')
const router = express.Router()
const itemController = require('../controller/item')
const authController = require('../controller/authentication')
const customerController = require('../controller/customer')
const passport = require('passport')

/* customer */
router.post('/customer', authController.verifyToken, customerController.createCustomerInfo)

router.put('/customer', authController.verifyToken, customerController.updateCustomerInfo)

router.get('/customer', authController.verifyToken, customerController.getCustomerInfo)

router.delete('/customer', authController.verifyToken, customerController.deleteCustomer)

// melihat daftar user
router.get('/users', authController.verifyToken, authController.findAll)

router.post('/signin', authController.signIn)

router.post('/signup', authController.signUp)

// item
router.get('/list', authController.verifyToken, itemController.getAllData)

router.post('/item', authController.verifyToken, itemController.createData)

// confirmation customer
router.post('/confirmation', customerController.confirmation)

// login facebook
router.get('/auth/facebook/login', passport.authenticate('facebook', {scope: ['email']}))

router.use('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

router.get('/auth/login/failed', function (req, res) {
  res.send('error')
})

router.get('/auth/login/success', function (req, res) {
  res.send('home')
})

module.exports = router
