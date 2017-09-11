
'use strict';

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
// var flash = require('express-flash');
// var session = require('express-session')
var mongoose = require('mongoose');




const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/regNumber";
mongoose.connection.on("error", function (err) {
  console.log("Mongo error : ");
  console.log(err);
});


mongoose.connect(mongoURL, function(err) {
  if (err) {
    console.log('Error Connecting to DB: ' + err);
  } else {
    console.log('connection to DB is successful');
  }
});

var plateNumber = mongoose.model('plateNumber', {
  plateNum: Number
});


app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

var regList = [];

app.get('/', function(req, res) {
    res.render('index')
})

app.post('/reg_numbers', function(req, res){
var regNumbers = req.body.name;
var area = req.body.regNum;
var string = ' ';

regList.push(regNumbers)

var newRegNumber = {
    plateArea: regNumbers
  };

  plateNumber.findOne({
  plateArea: regNumbers
  }, function(err, results) {
    if (!results) {
      plateNumber.create(newRegNumber);
    } else {

    };

  });


  res.render('index',{
    listReg : regList
  })
})


const port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Example app listening at :' + port)
});
