const Item = require('../models/item')
const Customer = require('../models/customer')
const jwt = require('jsonwebtoken')
const helper = require('sendgrid').mail
const sg = require('sendgrid')(process.env.SENDGRID_API_KEY)
const multer = require('multer')

module.exports = {
  getAllData: function (req, res) {
    Item.find().then(function (result) {
      res.send(result)
    })
  },

  getAllDataByHotel: function (req, res) {
    let hotelname = req.params.hotel
    Item.find({hotel: hotelname}).then(function (result) {
      res.json(result)
    })
  },
  claim: function (req, res) {
    let itemid = req.params.id

    let claim = {
      tanggal: req.body.tanggal,
      nomorkamar: req.body.nomorkamar
    }

    Item.findOne({ _id: itemid})
      .then(function (data) {
        if (data.nomorkamar === claim.nomorkamar && data.tanggal === claim.tanggal) {
          res.send('MATCH')
        }else {
          res.send('not MATCH')
        }
      }).catch(function (err) {
      res.send('No item found!')
    })
  },

  createData: function (req, res) {
    var imageName = req.files[0].originalname
    Item.create({
      namabarang: req.body.namabarang,
      photobarang: imageName,
      nomorkamar: req.body.nomorkamar,
      tanggal: req.body.tanggal,
      status: 0

    }).then(function (datahasil) {
      Customer.findOne({
        tanggal: req.body.tanggal,
        nomorkamar: req.body.nomorkamar
      }).then(function (result) {
        const token = jwt.sign({
          email: result.email,
          nomorkamar: result.nomorkamar,
          tanggal: result.tanggal
        }, process.env.SECRET, { expiresIn: '1d' })

        let link = '127.0.0.1:8080/client/confirmation.html'

        var from_email = new helper.Email('coffeteam@gmail.com')
        var to_email = new helper.Email(result.email) // email pengunjung hotel
        var item = req.body.namabarang // masukkan item yang hilang di sini
        var subject = 'Notifikasi Lost&Found'
        var isiEmail = `Kami dari Lostandfound telah menemukan sebuah barang ${item} berdasarkan informasi house-keeping kami, untuk konfirmasi silahkan klik <a href='http://${link}?token=${token}'>link berikut ini</a>.`

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
      res.redirect('http://127.0.0.1:8080/home.html')
    })
  }
}
