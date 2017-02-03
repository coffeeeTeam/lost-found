var User = require('../models/user.js')
var hash = require('password-hash')
var jwt = require('jsonwebtoken')
var express = require('express')
var router = express.Router()
var config = require('../config/config.json')

module.exports = {
  findAll: function (req, res, next) {
    User.find({}).then(function (users) {
      res.send(users)
    })
  },
  signUp: function (req, res, next) {
    var newUser = User({
      username: req.body.username,
      password: hash.generate(req.body.password)
    })

    newUser.save(function (err) {
      if (err) throw err

      res.send(`${req.body.username} has been created`)
    })
  },

  signIn: function (req, res, next) {
    User.find({username: req.body.username}, function (err, user) {
      if (err) throw err
      if (!user) {
        res.send('user not found')
      }
      if (hash.verify(req.body.password, user.password) == true) {
        var token = jwt.sign(user.dataValues, config.secret, { expiresIn: 60 * 60 })
        res.json({
          token: token
        })
      } else {
        res.send('wrong password')
      }
    })
  },
  verifyToken: function (req, res, next) {
    var decode = jwt.verify(req.header('token'), config.secret)

    if (decode) {
      next()
    } else {
      res.send('you are not login')
    }
  }

}
