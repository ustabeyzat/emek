var express = require('express');
var app = express();
var session = require('express-session');
var mysql = require('mysql'); // Veritabanı

// Veritabanı bilgileri
db = {
  host: 'localhost',
  database: 'site_db',
  user: 'root',
  password: 'parola'
}

// Root hesabı
hesap = {
  isim: "usta",
  parola: "parola"
}
hesap2 = {
  isim: "ustabeyzat",
  parola: "parola"
}


gorulme = {};

var hizmetler = `CREATE TABLE IF NOT EXISTS hizmetler (
  no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  isim VARCHAR(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  detay VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  etiket VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  tarih VARCHAR(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  dosyalar VARCHAR(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
);`;
var anasayfa = `CREATE TABLE IF NOT EXISTS anasayfa (
  no INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  slayt VARCHAR(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  alt VARCHAR(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci
);`;
// MySql 'e bağlan
var sql = mysql.createConnection(db);
sql.connect(function (error) {
  if (error) {
    console.log(error.message);
  }
  else {
    // Hizmetler tablosunu oluştur
    sql.query(hizmetler, function (error, results) {
      if (error) {
        console.log(error.message);
        sql.end(function (error) { // MySql bağlantsını kapat
          if (error) {console.log(error.message);}
        });
      }
      else {
        // Tablo oluşturuldu
        // Anasayfa tablosunu oluştur
        sql.query(anasayfa, function (error, results) {
          if (error) {
            console.log(error.message);
            sql.end(function (error) { // MySql bağlantsını kapat
              if (error) {console.log(error.message);}
            });
          }
          else {
            // Tablo oluşturuldu
            var sorgu = `SELECT * FROM anasayfa`;
            // Anasayfa tablosunun verilerini al
            sql.query(sorgu, function (error, results) {
              if (error) {
                console.log(error.message);
                sql.end(function (error) { // MySql bağlantsını kapat
                  if (error) {console.log(error.message);}
                });
              }
              else {
                // Tablo verileri alındı
                if (results.length > 0) {
                  // Veri varsa
                  sql.end(function (error) { // MySql bağlantsını kapat
                    if (error) {console.log(error.message);}
                  });
                }
                else {
                  // Veri yoksa
                  var veri_ekle = `INSERT INTO anasayfa VALUES(NULL, ?, ?);`;
                  var veriler = ["", ""];
                  // Anasayfa tablosuna veri ekle
                  sql.query(veri_ekle, veriler, function (error, results) {
                    if (error) {
                      console.log(error.message);
                      sql.end(function (error) { // MySql bağlantsını kapat
                        if (error) {console.log(error.message);}
                      });
                    }
                    else {
                      // Anasayfa tablosuna veri eklendi
                      sql.end(function (error) { // MySql bağlantsını kapat
                        if (error) {console.log(error.message);}
                      });
                    }
                  });
                }
              }
            });
          }
        });
      }
    });
  }
});

app.set('view engine', 'ejs');
app.set('views', __dirname + '/web/ejs');

app.use(session({
  secret: '6141efegl1380pd10ws0e7',
  resave: false,
  saveUninitialized: true
}));

app.use(express.static(__dirname + '/web/css'));
app.use(express.static(__dirname + '/web/records'));
app.use(express.static(__dirname + '/web/loads'));

// Url: site/anasayfa
app.use('/anasayfa', require(__dirname + '/web/js/main'));
// Url: site/sayfalar
app.use('/gl1378p', require(__dirname + '/web/js/giris'));
app.use('/gl13p', require(__dirname + '/web/js/cikis'));
app.use('/gl1379p', require(__dirname + '/web/js/ayarlar'));
app.use('/gl1310p', require(__dirname + '/web/js/ekle'));
app.use('/gl1380p', require(__dirname + '/web/js/olustur'));
app.use('/hakkimizda', require(__dirname + '/web/js/hakkimizda'));
app.use('/hizmetler', require(__dirname + '/web/js/hizmetler'));
app.use('/hizmet', require(__dirname + '/web/js/hizmet'));

app.use(function(req, res){
    res.render('yok');
});

// Yayınlarken IP ve portu sil
var port = 8080;
app.listen(port, function () {
  // Local IP al
  var nets = require('os').networkInterfaces();
  var adres = "127.0.0.1";
  for (var name of Object.keys(nets)) {
    for (var net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        // Local IP alındı
        adres = net.address;
      }
    }
  }
  // Mesaj
  console.log(' * IP: ' + adres + ':' + port + '/anasayfa\n');
});