`use strict`

let FacebookStrategy = require('passport-facebook').Strategy
let configAuth = require('./auth.js')
let Confirmation = require('../models/confirmation')

module.exports = function (passport) {

  // used to serialize the user for the session
  passport.serializeUser(function (user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function (id, done) {
    Confirmation.findById(id, function (err, user) {
      done(err, user)
    })
  })

  // =========================================================================
  // FACEBOOK ================================================================
  // =========================================================================

  passport.use(new FacebookStrategy({
    clientID: configAuth.facebookAuth.clientID,
    clientSecret: configAuth.facebookAuth.clientSecret,
    callbackURL: configAuth.facebookAuth.callbackURL,
    profileFields: ['id', 'emails', 'name']
  },
    function (token, refreshToken, profile, done) {
      process.nextTick(function () {
        Confirmation.findOne({ 'facebook.id': profile.id }, function (err, user) {
          if (err) return done(err)
          if (user) { return done(null, user) } else {
            var newUser = new Confirmation()
            newUser.facebook.id = profile.id
            newUser.facebook.token = token
            newUser.facebook.name = profile.name.givenName
            newUser.facebook.email = profile.emails[0].value

            newUser.save(function (err) {
              if (err) throw err
              return done(null, newUser)
            })
          }
        })
      })
    }
  ))
}
