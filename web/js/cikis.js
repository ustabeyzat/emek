// Url: site/gl13p
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

// Url: site/gl13p/
app.get('/', function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    req.session.gp15l02 = null;
    res.redirect("/anasayfa");
  }
  else {
    res.render('yok');
  }
});

module.exports = app;