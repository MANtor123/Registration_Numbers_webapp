
'use strict';

var express = require('express');
var app = express();
var exphbs = require('express-handlebars');
var bodyParser = require('body-parser');
// var flash = require('express-flash');
// var session = require('express-session')
//var mongoose = require('mongoose');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static('public'))


app.get('/', function(req, res) {
  //var regNumbers = req.body.regNum;
    res.render('index')
})

app.post('/reg_numbers', function(req, res){
var regNumbers = req.body.name;
console.log(regNumbers);
var area = req.body.regNum;
var string = ' ';




  res.render('index',{
    output : regNumbers
  })
})


const port = process.env.PORT || 8000;
app.listen(port, function() {
    console.log('Example app listening at :' + port)
});
