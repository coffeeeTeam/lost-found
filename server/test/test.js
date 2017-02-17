const chai = require('chai')
const expect = require('chai').expect
const chaiHttp = require('chai-http')
const app = 'http://localhost:3000/'
chai.use(chaiHttp)

describe('TESTING - INPUT CUSTOMER', function () {
  it('RESULT - create customer', function (done) {
    chai.request(app)
      .post('customer')
      .send({
        nama: 'irsan',
        email: 'san_smile@ymail.com',
        nomorkamar: 203,
        tanggal: '13/01/2017'
      })
      .end(function (err, res) {
        expect(res.body.data).to.be.an('object')
        done()
      })
  })

  it('RESULT - create user/admin', function (done) {
    chai.request(app)
      .post('signup')
      .send({
        username: 'iqbal',
        password: 'bandung',
        hotel: 'Kartika Chandra'
      })
      .end(function (err, res) {
        expect(res.text).to.be.an('string')
        done()
      })
  })

  it('RESULT - Find All item by HOTEL name ', function (done) {
    chai.request(app)
      .get('list/kartika')
      .end(function (err, res) {
        expect(res.body).to.be.an('array')
        done()
      })
  })

  it('RESULT - Find All item by customer side ', function (done) {
    chai.request(app)
      .get('list')
      .end(function (err, res) {
        expect(res.body).to.be.an('array')
        done()
      })
  })
})
