const express = require('express')
const router = express.Router()
const itemController = require('../controller/item')
const authController = require('../controller/authentication')
const customerController = require('../controller/customer')
const uploadController = require('../controller/upload')
const passport = require('passport')
const multer = require('multer')

/* customer */
router.post('/customer', customerController.createCustomerInfo)

router.put('/customer', customerController.updateCustomerInfo)

// authController.verifyToken,

router.get('/customer', customerController.getCustomerInfo)

router.delete('/customer', customerController.deleteCustomer)

// melihat daftar user
router.get('/users', authController.findAll)

router.post('/signin', authController.signIn)

router.post('/signup', authController.signUp)

// ,authController.verifyToken
// item
router.get('/list', itemController.getAllData)

router.get('/list/:hotel', itemController.getAllDataByHotel)

// confirmation

router.post('/confirmation', customerController.confirmation)

// confirmation customer via login facebook
router.get('/auth/facebook/login', passport.authenticate('facebook', {scope: ['email']}))

router.use('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/auth/login/success', failureRedirect: '/auth/login/failed' }))

router.get('/auth/login/failed', function (req, res) {
  res.send('error')
})

router.get('/auth/login/success', function (req, res) {
  res.redirect('http://127.0.0.1:8080/client/confirmation.html')
})

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

var upload = multer({
  storage: storage
})

router.post('/item', upload.any(), itemController.createData)

// router.post('/upload', upload.any(), uploadController.upload)

module.exports = router
