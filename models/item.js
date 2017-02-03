`use strict`
const mongoose = require('mongoose')
const Schema = mongoose.Schema

var itemSchema = new Schema({
  namabarang: String,
  photobarang: String,
  nomorkamar: String,
  tanggal: String,
  status: Boolean
},
  {
    timestamp: true
  })

var Item = mongoose.model('Item', userSchema)

module.exports = Item
