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
      password: hash.generate(req.body.password)
    })

    newUser.save(function (err) {
      if (err) throw err

      res.send(`${req.body.username} has been created`)
    })
  },

  signIn: function (req, res, next) {
    User.findOne({username: req.body.user}, function (err, user) {
      if (err) throw err
      if (!user) {
        res.redirect('http://127.0.0.1:8080/client/index.html')
      }
      var hasil = hash.verify(req.body.pass, user.password)
      if (hasil) {
        // var token = jwt.sign({username: user.username}, process.env.SECRET, { expiresIn: 60 * 60 })
        // res.json({
        //   token: token
        // })
        res.redirect('http://127.0.0.1:8080/client/home.html')
      } else {
        res.redirect('http://127.0.0.1:8080/client/index.html')
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
