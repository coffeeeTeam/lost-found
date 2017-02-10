`use strict`
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var confirmationSchema = new Schema({
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String
  }
},
  {
    timestamp: true
  })

var Confirmation = mongoose.model('Confirmation', confirmationSchema)

module.exports = Confirmation
