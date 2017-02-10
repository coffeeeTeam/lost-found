var helper = require('sendgrid').mail;

module.exports = {
  email : function(req, res, next){
    var from_email = new helper.Email('coffeteam@gmail.com');
    var to_email = new helper.Email(req.body.email); //email pengunjung hotel
    var item = req.body.item; //masukkan item yang hilang di sini
    var subject = 'Notifikasi Lost&Found';
    var token = 'isi token' //token yang nantinya akan dikirimkan
    var isiEmail = 'ini adalah isi dari email yang akan dikirimkan '+token;
    var content = new helper.Content('text/plain', isiEmail);
    var mail = new helper.Mail(from_email, subject, to_email, content);

    var sg = require('sendgrid')('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');
    var request = sg.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: mail.toJSON(),
    });

    sg.API(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
    })
  }
}
