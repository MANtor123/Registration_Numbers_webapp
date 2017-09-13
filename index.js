'use strict';

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
// var flash = require('express-flash');
// var session = require('express-session')
var mongoose = require('mongoose');




const mongoURL = process.env.MONGO_DB_URL || "mongodb://localhost/regNumber";
mongoose.connection.on("error", function(err) {
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
  plateNumber: String
});


app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({
  defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))

var regList = [];

app.get('/', function(req, res) {
  res.render('index')
})

app.post('/reg_numbers', function(req, res) {
  var regNumbers = req.body.name;
  var area = req.body.regNum;
  var string = ' ';

  regList.push(regNumbers)

  var newRegNumber = {
    plateNumber: regNumbers
  };

  plateNumber.findOne({
    plateNumber: regNumbers
  }, function(err, results) {
    if (err) {
      console.log(err);
      return
    }

    if (results) {
      console.log(results);
    } else {
      plateNumber.create(newRegNumber);

    }
    res.render('index', {
      listReg: regList
    })
  });

})


app.post('/reset_number', function(req, res){

plateNumber.remove({}, function(err, remove){
  if (err) {
    console.log(err);
    return
  }
  else{
    res.render('index', {

    })
  }
})

})

const port = process.env.PORT || 8000;
app.use(function(err, req, res, next) {
  res.status(500).send(err.stack);
})

app.listen(port, function() {
  console.log('Example app listening at :' + port)
});
