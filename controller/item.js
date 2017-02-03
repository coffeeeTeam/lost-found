const modelitem = require('../models/item')
const modelcustomer = require('../models/customer')
const jwt = require('jsonwebtoken')
const helper = require('sendgrid').mail

module.export = {
  getAllData: function (req, res) {
    modelitem.find().then(function (result) {
      res.send({result: result})
    })
  },

  createData: function (req, res) {
    modelitem.create({
      namabarang: req.body.namabarang,
      photobarang: req.body.foto,
      nomorkamar: req.body.nomorkamar,
      tanggal: req.body.tanggal,
      status: 0

    }).then(function (result) {
      modelcustomer.find({
        where: {
          tanggal: req.body.tanggal,
          nomorkamar: req.body.nomorkamar
        }
      }).then(function (result) {
        let token = jwt.sign({
          email: result.email,
          nomorkamar: result.nomorkamar,
        tanggal: result.tanggal}, config.secret,
          { expiresIn: 60 * 60 * 60 })

        let link = 'localhost:3000/confirmation?token='

        var from_email = new helper.Email('coffeteam@gmail.com')
        var to_email = new helper.Email(result.email) // email pengunjung hotel
        var item = req.body.namabarang // masukkan item yang hilang di sini
        var subject = 'Notifikasi Lost&Found'
        var isiEmail = 'Kami dari Lostandfound telah menemukan sebuah barang ' + item + ' berdasarkan infomrasi housekeeping kami, untuk konfirmasi silahkan klik ' + link + token
        var content = new helper.Content('text/plain', isiEmail)
        var mail = new helper.Mail(from_email, subject, to_email, content)

        var sg = require('sendgrid')('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')
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
    })
  }
}
