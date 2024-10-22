// Url: site/gl1378p
var express = require('express');
var app = express();
var session = require('express-session');

// Formdan gelen veriler için
var bodyParser = require('body-parser');
var form = bodyParser.urlencoded({ extended: false });

app.set('view engine', 'ejs');
app.set('views', __dirname + '/../ejs');

app.use(session({
  secret: '6141efegl1380pd10ws0e7',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/../css'));
app.use(express.static(__dirname + '/../records'));
app.use(express.static(__dirname + '/../loads'));

// Url: site/gl1378p/
app.get('/', function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    res.redirect("/gl1379p");
  }
  else {
    res.render('giris');
  }
});

// Url: site/gl1378p/
app.post('/', form, function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    res.redirect("/gl1379p");
  }
  else {
    // 1.hesap
    if (req.body.p1 == hesap.isim && req.body.p2 == hesap.parola) {
      req.session.gp15l02 = "d75tg28a";
      res.redirect("/gl1379p");
    }
    // 2.hesap
    else if (req.body.p1 == hesap2.isim && req.body.p2 == hesap2.parola) {
      req.session.gp15l02 = "d75tg28a";
      res.redirect("/gl1379p");
    }
    else {
      res.redirect("/anasayfa");
    }
  }
});

module.exports = app;