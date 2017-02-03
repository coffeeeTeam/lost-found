const model = require('../models')

modules.export = {
  getAllData: function (req, res) {
    model.Item.findall().then(function (result) {
      res.send({result: result})
    })
  }
}
