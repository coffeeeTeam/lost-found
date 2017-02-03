`use strict`
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var customerSchema = new Schema({
  nama: String,
  email: String,
  nomorkamar: String,
  tanggal: String
},
  {
    timestamp: true
  })

var Customer = mongoose.model('Customer', userSchema)

module.exports = Customer
