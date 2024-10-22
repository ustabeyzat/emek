// Url: site/hizmetler
var express = require('express');
var app = express();
var session = require('express-session');
var mysql = require('mysql'); // Veritabanı

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

// Url: site/hizmetler/
app.get('/', function (req, res) {
  // MySql 'e bağlan
  var sql = mysql.createConnection(db);
  sql.connect(function (error) {
    if (error) {
      console.log(error.message);
    res.render('hizmetler', {
      ileti: "* Veritabanına bağlanılamadı !",
      veri: "",
      goz: ""
    });
    }
    else {
      var veri = [];
    var veriler = `SELECT * FROM hizmetler`;
      // Hizmetler tablosunun verilerini al
      sql.query(veriler, function (error, results) {
        if (error) {
          console.log(error.message);
          sql.end(function (error) { // MySql bağlantsını kapat
            if (error) {console.log(error.message);}
          });
          res.render('hizmetler', {
            ileti: "* İşlem tamamlanamadı !",
            veri: "",
            goz: ""
          });
        }
        else {
          // Tablo verileri alındı
          var hizmetler = [];
          var tarihler = [];
          for (var i = 0; i < results.length; i++) {
            hizmetler.push(results[i]);
            tarihler.push(results[i].tarih);
          }
          tarihler = tarihler.sort();
          for (var i = 0; i < tarihler.length; i++) {
            for (var i2 = 0; i2 < hizmetler.length; i2++) {
              if (tarihler[i] == hizmetler[i2].tarih) {
                veri.push(hizmetler[i2]);
                hizmetler[i2] = "boş"
              }
            }
          }

          sql.end(function (error) { // MySql bağlantsını kapat
            if (error) {console.log(error.message);}
          });
          res.render('hizmetler', {
            ileti: "",
            veri: veri,
            goz: gorulme
          });
        }
      });
    }
  });
});

// Url: site/hizmetler/
app.post('/', form, function (req, res) {
  if (req.body.kelime == "") {
    res.redirect("/hizmetler");
  }
  else {
    // MySql 'e bağlan
    var sql = mysql.createConnection(db);
    sql.connect(function (error) {
      if (error) {
        console.log(error.message);
      res.render('hizmetler', {
        ileti: "* Veritabanına bağlanılamadı !",
        veri: "",
        goz: ""
      });
      }
      else {
        var veri = [];
      var veriler = `SELECT * FROM hizmetler`;
        // Hizmetler tablosunun verilerini al
        sql.query(veriler, function (error, results) {
          if (error) {
            console.log(error.message);
            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
            res.render('hizmetler', {
              ileti: "* İşlem tamamlanamadı !",
              veri: "",
              goz: ""
            });
          }
          else {
            // Tablo verileri alındı
            var hizmetler = [];
            var tarihler = [];
            for (var i = 0; i < results.length; i++) {
              for (var i2 = 0; i2 < results[i].etiket.split("#").length; i2++) {
                if (results[i].etiket.split("#")[i2] == req.body.kelime) {
                  hizmetler.push(results[i]);
                  tarihler.push(results[i].tarih);
                }
              }
            }
            tarihler = tarihler.sort();
            for (var i = 0; i < tarihler.length; i++) {
              for (var i2 = 0; i2 < hizmetler.length; i2++) {
                if (tarihler[i] == hizmetler[i2].tarih) {
                  veri.push(hizmetler[i2]);
                  hizmetler[i2] = "boş"
                }
              }
            }

            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
            res.render('hizmetler', {
              ileti: req.body.kelime.toUpperCase(),
              veri: veri,
              goz: gorulme
            });
          }
        });
      }
    });
  }
});

module.exports = app;