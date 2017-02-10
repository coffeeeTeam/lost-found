`use strict`
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var customerSchema = new Schema({
  email: String,
  nomorkamar: String,
  tanggal: String,
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

var Customer = mongoose.model('Customer', customerSchema)

module.exports = Customer
