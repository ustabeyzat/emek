// Url: site/hizmet
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

// id = değişken parametre
// Url: site/hizmet/id
app.get('/:id', function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    var sorgu = `SELECT * FROM hizmetler WHERE no = ?`;
    // MySql 'e bağlan
    var sql = mysql.createConnection(db);
    sql.connect(function (error) {
      if (error) {
        console.log(error.message);
        res.render('hizmet2', {
          ileti: "* Veritabanına bağlanılamadı !",
          veri: "",
          goz: ""
        });
      }
      else {
        // Hizmetler tablosunda numarayı(req.params.id) sorgula
        sql.query(sorgu, req.params.id, function (error, results) {
          if (error) {
            console.log(error.message);
            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
            res.render('hizmet2', {
              ileti: "* İşlem tamamlanamadı !",
              veri: "",
              goz: ""
            });
          }
          else {
            if (results.length > 0) {
              // Numara varsa
              if (results[0].no == req.params.id) {
                var veri = results[0];
                sql.end(function (error) { // MySql bağlantsını kapat
                  if (error) {console.log(error.message);}
                });
                res.render('hizmet2', {
                  ileti: "",
                  veri: veri,
                  goz: gorulme
                });
              }
              else {
                sql.end(function (error) { // MySql bağlantsını kapat
                  if (error) {console.log(error.message);}
                });
                res.render('yok');
              }
            }
            else {
              // Numara yoksa
              sql.end(function (error) { // MySql bağlantsını kapat
                if (error) {console.log(error.message);}
              });
              res.render('yok');
            }
          }
        });
      }
    });
  }
  else {
    var sorgu = `SELECT * FROM hizmetler WHERE no = ?`;
    // MySql 'e bağlan
    var sql = mysql.createConnection(db);
    sql.connect(function (error) {
      if (error) {
        console.log(error.message);
        res.render('hizmet', {
          ileti: "* Veritabanına bağlanılamadı !",
          veri: "",
          goz: ""
        });
      }
      else {
        // Hizmetler tablosunda numarayı(req.params.id) sorgula
        sql.query(sorgu, req.params.id, function (error, results) {
          if (error) {
            console.log(error.message);
            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
        	  res.render('hizmet', {
        	    ileti: "* İşlem tamamlanamadı !",
              veri: "",
              goz: ""
        	  });
          }
          else {
            if (results.length > 0) {
            	// Numara varsa
            	if (results[0].no == req.params.id) {
                if (req.session.gp15l02 != "d75tg28a") {
                  if (!gorulme["hizmet" + results[0].no]) {
                    gorulme["hizmet" + results[0].no] = 1;
                  }
                  else {
                    gorulme["hizmet" + results[0].no] += 1;
                  }
                }

                var veri = results[0];
                sql.end(function (error) { // MySql bağlantsını kapat
                  if (error) {console.log(error.message);}
                });
    		        res.render('hizmet', {
    		          ileti: "",
                  veri: veri,
                  goz: gorulme
    		        });
    		      }
    		      else {
                sql.end(function (error) { // MySql bağlantsını kapat
                  if (error) {console.log(error.message);}
                });
                res.render('yok');
    		      }
    		    }
    		    else {
              // Numara yoksa
              sql.end(function (error) { // MySql bağlantsını kapat
                if (error) {console.log(error.message);}
              });
              res.render('yok');
    		    }
          }
        });
      }
    });
  }
});

// id = değişken parametre
// Url: site/hizmet/id
app.post('/:id', form, function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    var sorgu = `SELECT * FROM hizmetler WHERE no = ?`;
    // MySql 'e bağlan
    var sql = mysql.createConnection(db);
    sql.connect(function (error) {
      if (error) {
        console.log(error.message);
        res.render('hizmet', {
          ileti: "* Veritabanına bağlanılamadı !",
          veri: "",
          goz: ""
        });
      }
      else {
        // Hizmetler tablosunda numarayı(req.params.id) sorgula
        sql.query(sorgu, req.params.id, function (error, results) {
          if (error) {
            console.log(error.message);
            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
            res.render('hizmet', {
              ileti: "* İşlem tamamlanamadı !",
              veri: "",
              goz: ""
            });
          }
          else {
            if (results.length > 0) {
              // Numara varsa
              if (results[0].no == req.params.id) {
                if (req.body.isim || req.body.isim == "") {
                  var yeni_veri = [req.body.isim, req.body.detay, req.body.etiket, req.body.tarih, req.params.id];
                  var yenile = `UPDATE hizmetler SET isim = ?, detay = ?, etiket = ?, tarih = ? WHERE no = ?`;
                  // Hizmeti güncelle
                  sql.query(yenile, yeni_veri, function (error, results) {
                    if (error) {
                      console.log(error.message);
                      sql.end(function (error) { // MySql bağlantsını kapat
                        if (error) {console.log(error.message);}
                      });
                      res.redirect("/hizmet/"+req.params.id);
                    }
                    else {
                      // Hizmet güncellendi
                      sql.end(function (error) { // MySql bağlantsını kapat
                        if (error) {console.log(error.message);}
                      });
                      res.redirect("/hizmet/"+req.params.id);
                    }
                  });
                }
                else {
                  var sil = `DELETE FROM hizmetler WHERE no = ?`;
                  // Hizmeti sil
                  sql.query(sil, req.params.id, function (error, results) {
                    if (error) {
                      console.log(error.message);
                      sql.end(function (error) { // MySql bağlantsını kapat
                        if (error) {console.log(error.message);}
                      });
                      res.redirect("/hizmet/"+req.params.id);
                    }
                    else {
                      // Hizmet silindi
                      sql.end(function (error) { // MySql bağlantsını kapat
                        if (error) {console.log(error.message);}
                      });
                      res.redirect("/hizmet/"+req.params.id);
                    }
                  });
                }
              }
              else {
                sql.end(function (error) { // MySql bağlantsını kapat
                  if (error) {console.log(error.message);}
                });
                res.render('yok');
              }
            }
            else {
              // Numara yoksa
              sql.end(function (error) { // MySql bağlantsını kapat
                if (error) {console.log(error.message);}
              });
              res.render('yok');
            }
          }
        });
      }
    });
  }
  else {
    res.render('yok');
  }
});
module.exports = app;