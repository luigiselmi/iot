/*
  Example of a very simple REST server app.
*/

// Start REST server
var express = require('express')
  , app = express()

  const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
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

app.use( bodyParser.text(options) );

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.get('/', (req, res) => {
  console.log("Received a GET request from a client");
  logger.info("Received a GET request from a client");
  return res.send('Hello from Server!!');
});

app.post('/', (req, res) => {
  console.log("Received a POST request from a client");
  logger.info("Received a POST request from a client");
  return res.send('A POST request');
})

var server = app.listen(8082, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("REST API listening at http://%s:%s", host, port);
  logger.info("REST API listening at http://%s:%s", host, port);
})
