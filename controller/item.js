const Item = require('../models/item')
const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
const helper = require('sendgrid').mail
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY)

module.exports = {
  getAllData: function (req, res) {
    Item.find().then(function (result) {
      res.send({result})
    })
  },

  createData: function (req, res) {
    Item.create({
      namabarang: req.body.namabarang,
      photobarang: req.body.foto,
      nomorkamar: req.body.nomorkamar,
      tanggal: req.body.tanggal,
      status: 0

    }).then(function (datahasil) {
      Customer.findOne({
        tanggal: req.body.tanggal,
        nomorkamar: req.body.nomorkamar
      })
        .then(function (result) {
          console.log('..................')

          const token = jwt.sign({
            email: result.email,
            nomorkamar: result.nomorkamar,
            tanggal: result.tanggal
          }, process.env.SECRET, { expiresIn: '1d' })

          console.log(result.email)
          console.log(result.nomorkamar)
          console.log(result.tanggal)
          console.log(result.email)

          let link = 'localhost:3000/confirmation?token='

          var from_email = new helper.Email('coffeteam@gmail.com')
          var to_email = new helper.Email(result.email) // email pengunjung hotel
          var item = req.body.namabarang // masukkan item yang hilang di sini
          var subject = 'Notifikasi Lost&Found'
          var isiEmail = `Kami dari Lostandfound telah menemukan sebuah barang ${item} berdasarkan informasi house-keeping kami, untuk konfirmasi silahkan klik <a href='http://${link}${token}'>link berikut ini</a>.`

          var content = new helper.Content('text/html', isiEmail)
          var mail = new helper.Mail(from_email, subject, to_email, content)

          var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON()
          })

          sg.API(request, function (error, response) {
            console.log(response.statusCode)
            console.log(response.body)
            console.log(response.headers)
          })
        })
      res.send({hasil: datahasil})
    })
  }
}
