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
})

describe('TESTING - INPUT ADMIN', function () {
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
})

describe('TESTING - FIND ALL ITEMS', function () {
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

describe('TESTING - ITEM CLAIM', function () {
  it('RESULT - Find All item by customer side ', function (done) {
    chai.request(app)
      .post('item/58a6b95f66e516139918d3ac/claim')
      .send({
        tanggal: '2017-01-13',
        nomorkamar: 203
      })
      .end(function (err, res) {
        expect(res.text).to.equal('MATCH')
        done()
      })
  })
})
