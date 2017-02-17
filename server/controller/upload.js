const multer = require('multer')
const Item = require('../models/item')

module.exports = {
  upload: function (req, res) {
    var imageName = req.files[0].originalname

    var item = new Item({
      namabarang: req.body.namabarang,
      photobarang: imageName,
      nomorkamar: req.body.nomorkamar,
      tanggal: req.body.tanggal,
      status: 0
    })

    item.save(function (err, data) {
      if (err)throw err
      res.redirect('http://127.0.0.1:8080/home.html')
    })
  }
}
