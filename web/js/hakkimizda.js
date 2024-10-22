// Url: site/hakkimizda
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

// Url: site/hakkimizda/
app.get('/', function (req, res) {
  req.session["hakkimizda"] += 1;
  
  if (req.session.gp15l02 != "d75tg28a") {
    if (!gorulme["hakkimizda"]) {
      gorulme["hakkimizda"] = 1;
    }
    else {
      gorulme["hakkimizda"] += 1;
    }
  }

  res.render('hakkimizda', {
    goz: gorulme
  });
});

module.exports = app;