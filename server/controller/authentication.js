const User = require('../models/user.js')
const hash = require('password-hash')
const jwt = require('jsonwebtoken')

module.exports = {
  findAll: function (req, res, next) {
    User.find({}).then(function (users) {
      res.send(users)
    })
  },
  signUp: function (req, res, next) {
    var newUser = User({
      username: req.body.username,
      password: hash.generate(req.body.password),
      hotel: req.body.hotel
    })
    newUser.save(function (err) {
      if (err) throw err
      res.send(`${req.body.username} has been created`)
    })
  },

  signIn: function (req, res, next) {
    User.findOne({username: req.body.username}, function (err, user) {
      if (err) throw err
      if (!user) {
        res.send('user not found')
      }
      var hasil = hash.verify(req.body.password, user.password)
      if (hasil) {
        var token = jwt.sign({username: user.username}, process.env.SECRET, { expiresIn: 60 * 60 })
        res.json({
          token: token
        })
      } else {
        res.send('wrong password')
      }
    })
  },
  verifyToken: function (req, res, next) {
    var decode = jwt.verify(req.header('token'), process.env.SECRET)

    if (decode) {
      next()
    } else {
      res.send('you are not login')
    }
  }

}
