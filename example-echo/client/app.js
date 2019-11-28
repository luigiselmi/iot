/*
  Example of a very simple REST client app.
*/

// Start REST server
var express = require('express')
  , app = express()
  , path = require('path');

const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    // - Write to all logs with level `info` and below to `combined.log` 
    new winston.transports.Console(),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

// just use raw body data
var bodyParser = require('body-parser')
var options = {
  inflate: true,
  limit: '10kb',
  type: 'text/xml'
};

app.use( bodyParser.raw(options) );
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Start web page /
app.get('/', function (req, res, next) {
  try {
    res.sendFile('index.html');
  } catch (e) {
    next(e)
  }
})

var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("REST API listening at http://%s:%s", host, port);
  logger.info("REST API listening at http://%s:%s", host, port);
})