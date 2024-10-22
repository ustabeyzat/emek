// Url: site/gl1380p
var express = require('express');
var app = express();
var session = require('express-session');
var mysql = require('mysql'); // Veritabanı
var multer  = require('multer'); // Dosya kaydet

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

// Url: site/gl1380p/
app.get('/', function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    res.render('olustur', {
      ileti: "<<< HİZMET EKLE"
    });
  }
  else {
    res.render('yok');
  }
});

// Dosya kaydetme işlemi
// Dosya seçenekleri
var storage = multer.diskStorage({
  filename: function (req, file, cb) {
    var format = file.originalname.split(".");
    format = format[format.length-1];
    cb(null, Date.now() + "." + format); // Dosya ismi
  },
  destination: function (req, file, cb) {
    cb(null, __dirname + '/../loads'); // Kaydedilecek yer
  }
})
// false dosya sayısı veya boyutu sonsuz yapar
var max_dosya = 30; // Maksimum dosya sayısı
var max_boyut = 5; // Maksimum dosya boyutu (MB)
if (max_dosya && max_boyut) {
  var upload = multer({
    storage: storage,
    limits: {
      files: max_dosya,
      fileSize: 1048576 * max_boyut
    }
  }).any('dosyalar');
}
else if (max_dosya) {
  var upload = multer({
    storage: storage,
    limits: {
      files: max_dosya
    }
  }).any('dosyalar');
}
else if (max_boyut) {
  var upload = multer({
    storage: storage,
    limits: {
      fileSize: 1048576 * max_boyut
    }
  }).any('dosyalar');
}
else {
  var upload = multer({
    storage: storage
  }).any('dosyalar');
}
// Url: site/gl1380p/
app.post('/', function (req, res) {
  if (req.session.gp15l02 == "d75tg28a") {
    upload(req, res, function(error) {  // Dosyaları kaydet
      var mb = 0;
      var dosya_isimleri = "";
      for (var i = 0; i < req.files.length; i++) {
        mb += req.files[i].size/1048576;
        dosya_isimleri += "/" + req.files[i].filename;
      }
      mb = mb.toFixed(2);
      var sayi = req.files.length;
      if (error) {
        if (error.message == "File too large") {
          res.render('olustur', {
            ileti: "<<< * Bir dosyanın boyutu " + max_boyut + " megabaytı (MB) geçmesin !"
          });
        }
        else if (error.message == "Too many files") {
          res.render('olustur', {
            ileti: "<<< * " + max_dosya + " dosyadan fazla yüklenemez !"
          });
        }
        else {
          console.log(error.message);
          res.render('olustur', {
            ileti: "<<< * Dosyalar kaydedilemedi !"
          });
        }
      }
      else {
        // Dosyalar kaydedildi
        if (req.body.isim.length < 150 && req.body.detay.length < 1000 && req.body.etiket.length < 1000 && req.body.tarih.length < 30 && dosya_isimleri.length < 1000) {
    	    var veri_ekle = `INSERT INTO hizmetler VALUES(NULL, ?, ?, ?, ?, ?);`;
    	    var veriler = [req.body.isim, req.body.detay, req.body.etiket, req.body.tarih, dosya_isimleri];
  		    // MySql 'e bağlan
  		    var sql = mysql.createConnection(db);
  		    sql.connect(function (error) {
  		      if (error) {
  		        console.log(error.message);
  		        res.render('olustur', {
  		          ileti: "<<< * Veritabanına bağlanılamadı !"
  		        });
  		      }
  		      else {
  		        // Hizmetler tablosuna veri ekle
  		        sql.query(veri_ekle, veriler, function (error, results) {
  		          if (error) {
  		            console.log(error.message);
  		            sql.end(function (error) { // MySql bağlantsını kapat
  		              if (error) {console.log(error.message);}
  		            });
  		            res.render('olustur', {
  		              ileti: "<<< * Tabloya (hizmetler) veri eklenemedi !"
  		            });
  		          }
  		          else {
  		            // Hizmetler tablosuna veri eklendi
  		            sql.end(function (error) { // MySql bağlantsını kapat
  		              if (error) {console.log(error.message);}
  		            });
  		            res.render('olustur', {
  		              ileti: "<<< * Tabloya (hizmetler) veri eklendi. " + sayi + " dosya (" + mb + " MB) kaydedildi"
  		            });
  		          }
  		        });
  		      }
  		    });
        }
        else {
          res.render('olustur', {
            ileti: "<<< * Fazla karekter kullanmayın !"
          });
        }
      }
    });
  }
  else {
    res.render('yok');
  }
});

module.exports = app;