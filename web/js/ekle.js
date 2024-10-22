// Url: site/gl1310p
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

// Url: site/gl1310p/
app.get('/', function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    // MySql 'e bağlan
    var sql = mysql.createConnection(db);
    sql.connect(function (error) {
      if (error) {
        console.log(error.message);
    	res.render('ekle', {
    	  ileti: "<<< * Veritabanına bağlanılamadı !",
    	  veri: ""
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
    		    res.render('ekle', {
    		      ileti: "<<< * Tablo (hizmetler) verileri alınamadı !",
    		      veri: ""
    		    });
          }
          else {
            // Tablo verileri alındı
            for (var i = 0; i < results.length; i++) {
              veri.push(results[i]);
        	  }
            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
    		    res.render('ekle', {
    		      ileti: "<<< ANASAYFAYA EKLE",
    		      veri: veri
    		    });
          }
        });
      }
    });
  }
  else {
    res.render('yok');
  }
});

// Url: site/gl1310p/
app.post('/', form, function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    if (req.body.slayt.length < 5000 && req.body.alt.length < 5000) {
      var yeni_veri = [req.body.slayt, req.body.alt, "1"];
      var yenile = `UPDATE anasayfa SET slayt = ?, alt = ? WHERE no = ?`;
  	  // MySql 'e bağlan
  	  var sql = mysql.createConnection(db);
      sql.connect(function (error) {
        if (error) {
          console.log(error.message);
          res.render('ekle', {
            ileti: "<<< * Veritabanına bağlanılamadı !",
            veri: ""
          });
        }
        else {
          // Anasayfa tablosunu güncelle
          sql.query(yenile, yeni_veri, function (error, results) {
            if (error) {
              console.log(error.message);
              var veri = [];
    	        var veriler = `SELECT * FROM hizmetler`;
              // Hizmetler tablosunun verilerini al
              sql.query(veriler, function (error, results) {
                if (error) {
                  console.log(error.message);
                  sql.end(function (error) { // MySql bağlantsını kapat
                    if (error) {console.log(error.message);}
                  });
    	      	    res.render('ekle', {
    	      	      ileti: "<<< * Tablo (hizmetler) verileri alınamadı !",
    	      	      veri: ""
    	      	    });
                }
                else {
                  // Tablo verileri alındı
                  for (var i = 0; i < results.length; i++) {
                    veri.push(results[i]);
              	  }
                  sql.end(function (error) { // MySql bağlantsını kapat
                    if (error) {console.log(error.message);}
                  });
                  res.render('ekle', {
                    ileti: "<<< * Tabloya (anasayfa) veri eklenemedi !",
                    veri: veri
                  });
                }
              });
            }
            else {
              // Anasayfa tablosu güncellendi
              var veri = [];
    	        var veriler = `SELECT * FROM hizmetler`;
              // Hizmetler tablosunun verilerini al
              sql.query(veriler, function (error, results) {
                if (error) {
                  console.log(error.message);
                  sql.end(function (error) { // MySql bağlantsını kapat
                    if (error) {console.log(error.message);}
                  });
    	      	    res.render('ekle', {
    	      	      ileti: "<<< * Tablo (hizmetler) verileri alınamadı !",
    	      	      veri: ""
    	      	    });
                }
                else {
                  // Tablo verileri alındı
                  for (var i = 0; i < results.length; i++) {
                    veri.push(results[i]);
              	  }
                  sql.end(function (error) { // MySql bağlantsını kapat
                    if (error) {console.log(error.message);}
                  });
                  res.render('ekle', {
                    ileti: "<<< * Tabloya (anasayfa) veri eklendi",
                    veri: veri
                  });
                }
              });
            }
          });
        }
      });
    }
    else {
  	  // MySql 'e bağlan
  	  var sql = mysql.createConnection(db);
      sql.connect(function (error) {
        if (error) {
          console.log(error.message);
          res.render('ekle', {
            ileti: "<<< * Veritabanına bağlanılamadı !",
            veri: ""
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
    	  	    res.render('ekle', {
    	  	      ileti: "<<< * Tablo (hizmetler) verileri alınamadı !",
    	  	      veri: ""
    	  	    });
            }
            else {
              // Tablo verileri alındı
              for (var i = 0; i < results.length; i++) {
                veri.push(results[i]);
          	  }
              sql.end(function (error) { // MySql bağlantsını kapat
                if (error) {console.log(error.message);}
              });
      		    res.render('ekle', {
      		      ileti: "<<< * Fazla karekter kullanmayın !",
      		      veri: veri
      		    });
            }
          });
		    }
      });
    }
  }
  else {
    res.render('yok');
  }
});

module.exports = app;