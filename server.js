// Setup server
const express = require('express');
const multer = require('multer');
const upload = multer();
const cors = require('cors');
require('dotenv').config();

const app = express();

// Setup cors
app.use(cors());

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

// File metadata api
app.post('/api/fileanalyse', upload.single("upfile"), function (req, res) {
  const {originalname, mimetype, size} = req.file;
  res.json({
    name: originalname,
    type: mimetype,
    size: size
  });
});




// Port listener
const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
