/* Url: site/
   Url: site/anasayfa
*/
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

/* Url: site/
   Url: site/anasayfa/
*/
app.get('/', function (req, res) {
  var sorgu = `SELECT * FROM anasayfa`;
  // MySql 'e bağlan
  var sql = mysql.createConnection(db);
  sql.connect(function (error) {
    if (error) {
      console.log(error.message);
      res.render('main', {
        ileti: "* Veritabanına bağlanılamadı !",
        slayt: "",
        liste: "",
        goz: ""
      });
    }
    else {
      // Anasayfa tablosunu sorgula
      sql.query(sorgu, function (error, results) {
        if (error) {
          console.log(error.message);
          sql.end(function (error) { // MySql bağlantsını kapat
            if (error) {console.log(error.message);}
          });
          res.render('main', {
            ileti: "* İşlem tamamlanamadı !",
            slayt: "",
            liste: "",
            goz: ""
          });
        }
        else {
          // Anasayfa tablosu sorgulandı
          if (results.length > 0) {
            // Veri varsa
            var ust = [];
            for (var i = 0; i < results[0].slayt.split("#").length; i++) {
              if (results[0].slayt.split("#")[i] != "") {
                ust.push(results[0].slayt.split("#")[i]);
              }
            }
            var alt = [];
            for (var i2 = 0; i2 < results[0].alt.split("#").length; i2++) {
              if (results[0].alt.split("#")[i2]) {
                alt.push(results[0].alt.split("#")[i2]);
              }
            }

            var veri2 = [];
            var veri = [];
            var veriler = `SELECT * FROM hizmetler`;
            // Hizmetler tablosunun verilerini al
            sql.query(veriler, function (error, results) {
              if (error) {
                console.log(error.message);
                sql.end(function (error) { // MySql bağlantsını kapat
                  if (error) {console.log(error.message);}
                });
                res.render('main', {
                  ileti: "* Tablo (hizmetler) verileri alınamadı !",
                  slayt: "",
                  liste: "",
                  goz: ""
                });
              }
              else {
                // Hizmetler tablosunun verilerini alındı
                if (results.length > 0) {
                  // Veri varsa
                  for (var i3 = 0; i3 < results.length; i3++) {
                    for (var i4 = 0; i4 < ust.length; i4++) {
                      // Numara varsa
                      if (results[i3].no == ust[i4]) {
                        // Veriye ekle
                        veri[i4] = results[i3];
                      }
                    }
                    for (var i5 = 0; i5 < alt.length; i5++) {
                      // Numara varsa
                      if (results[i3].no == alt[i5]) {
                        // Veriye ekle
                        veri2[i5] = results[i3];
                      }
                    }
                  }
                  veri = veri.filter(Boolean);
                  veri2 = veri2.filter(Boolean);

                  if (req.session.gp15l02 != "d75tg28a") {
                    if (!gorulme["anasayfa"]) {
                      gorulme["anasayfa"] = 1;
                    }
                    else {
                      gorulme["anasayfa"] += 1;
                    }
                  }

                  sql.end(function (error) { // MySql bağlantsını kapat
                    if (error) {console.log(error.message);}
                  });
                  // Anasayfaya yönlendir
                  res.render('main', {
                    // Anasayfaya yönlendirildi
                    ileti: "",
                    slayt: veri,
                    liste: veri2,
                    goz: gorulme
                  });
                }
                else {
                  // Veri yoksa
                  if (req.session.gp15l02 != "d75tg28a") {
                    if (!gorulme["anasayfa"]) {
                      gorulme["anasayfa"] = 1;
                    }
                    else {
                      gorulme["anasayfa"] += 1;
                    }
                  }

                  sql.end(function (error) { // MySql bağlantsını kapat
                    if (error) {console.log(error.message);}
                  });
                  // Anasayfaya yönlendir
                  res.render('main', {
                    // Anasayfaya yönlendirildi
                    ileti: "* Henüz hizmet eklenmedi",
                    slayt: "",
                    liste: "",
                    goz: gorulme
                  });
                }
              }
            });
          }
          else {
            // Veri yoksa
            console.log("* Anasayfa tablosunda veri yok !");
            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
            res.render('main', {
              ileti: "* İşlem tamamlanamadı !",
              slayt: "",
              liste: "",
              goz: ""
            });
          }
        }
      });
    }
  });
});

module.exports = app;