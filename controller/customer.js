const Customer = require('../models/customer');

module.exports = {
  createCustomerInfo : function(req, res, next){
    var customerInfo = new Customer({
      nama: req.body.nama,
      email: req.body.email,
      nomorkamar: req.body.nomorkamar,
      tanggal: req.body.tanggal
    })
      customerInfo.save(function(err,data){
      if(err)throw err;
      res.send({data:data})
    })
  },
  getCustomerInfo : function(req, res, next){
    Customer.find({},function(err, customer){
      if(err)throw err;
      res.send({customer:customer})
    })
  },
  deleteCustomer: function(req, res, next) {
    var inputEmail = req.body.email;
    Customer.findOneAndRemove({ email: inputEmail }, function(err,data) {
    if (err) throw err;
      res.send({
                data: data.nama,
                msg:'data berhasil dihapus'
              })
    });
  },
  updateCustomerInfo: function(req, res, next) {
    Customer.findOneAndUpdate({ email: req.body.email }, { nama: req.body.nama, nomorkamar: req.body.nomorkamar, tanggal: req.body.tanggal},
    function(err, data) {
    if (err) throw err;
    res.send({data:data})
  });
  }
}
