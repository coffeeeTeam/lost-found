const Customer = require('../models/customer')
const Item = require('../models/item')
const jwt = require('jsonwebtoken')

module.exports = {
  createCustomerInfo: function (req, res, next) {
    var customerInfo = new Customer({
      nama: req.body.nama,
      email: req.body.email,
      nomorkamar: req.body.nomorkamar,
      tanggal: req.body.tanggal
    })
    customerInfo.save(function (err, data) {
      if (err)throw err
      res.send({data: data})
    })
  },
  getCustomerInfo: function (req, res, next) {
    Customer.find({}, function (err, customer) {
      if (err)throw err
      res.send({customer: customer})
    })
  },
  deleteCustomer: function (req, res, next) {
    var inputEmail = req.body.email
    Customer.findOneAndRemove({ email: inputEmail }, function (err, data) {
      if (err) throw err
      res.send({
        data: data.nama,
        msg: 'data berhasil dihapus'
      })
    })
  },
  updateCustomerInfo: function (req, res, next) {
    Customer.findOneAndUpdate({ email: req.body.email }, { nama: req.body.nama, nomorkamar: req.body.nomorkamar, tanggal: req.body.tanggal},
      function (err, data) {
        if (err) throw err
        res.send({data: data})
      })
  },
  confirmation: function (req, res) {
    var decode = jwt.verify(req.body.token, process.env.SECRET)
    if (decode.nomorkamar == req.body.nomorkamar && decode.tanggal == req.body.tanggal) {
      Item.find({
        where: {
          nomorkamar: req.body.nomorkamar,
        tanggal: req.body.tanggal}
      }).then(function (data) {
        data.updateAttributes({
          status: 1
        })
      })

      res.send('yes')
    }else {
      res.send('no')
    }
  }

}
