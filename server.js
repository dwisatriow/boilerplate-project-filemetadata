// Setup server
var express = require('express');
var cors = require('cors');
require('dotenv').config();
const bodyParser = require("body-parser");

var app = express();

// Setup cors and body parser
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Request logger
app.use(function (req, res, next) {
  var log = req.method + " " + req.path + " - " + req.ip;
  console.log(log);
  next();
});

// Serve public as static
app.use('/public', express.static(process.cwd() + '/public'));

// Serve index.html
app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});




// Port listener
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
