

const spdy = require("spdy");
const compression = require("compression");
const cors = require("cors");
var express = require("express");
// var fs = require("fs");
const config = require("./config");
// console.log("arg2 =>", process.argv[3])
// console.log("config =>", config)
// http1.1
var https = require('https');
var http = require('http');
var serverRunner;
// Pull information from HTML POST (express4)
var bodyParser = require("body-parser");
// const { endianness } = require( "os" );
var URL_ARG = process.argv[2];
var options = null;

if (config.SELF_HOST.protocol == 'http') {
  serverRunner = http;
} else if (config.SELF_HOST.protocol == 'https') {
  serverRunner = https;
} else if (config.SELF_HOST.protocol == 'http2') {
  serverRunner = spdy;
}

var hostingHTTP = express();
// vhost = require('vhost')
// routerSub = express.Router()
// routerSub.use(express.static('/var/www/html/apps/ultimate-roulette/'));
// hostingHTTP.use(vhost('roulette.maximumroulette.com', routerSub));

hostingHTTP.get('*', function(req, res, next) {
  console.log(">>" , req.hostname);
  /* if (req.hostname == "ai.maximumroulette.com") {
    //console.log(" REDIRECT NOW " )
    //req.location = "/apps/ai/";
    //res.sendFile("/apps/ai/index.html");
    //res.end();
  } */
  next();
});

if (typeof URL_ARG !== 'undefined') {
  hostingHTTP.use(express.static(URL_ARG));
  console.log("Hosted on ", URL_ARG);
} else {
  hostingHTTP.use(express.static(config.PATH_OF_WWW));
  console.log("Hosted on ", config.PATH_OF_WWW);
}

hostingHTTP.use(compression());
hostingHTTP.use(cors());

hostingHTTP.use(function (req, res, next) {
  // res.setHeader("Content-Type", "text/html")
  res.setHeader('Content-Encoding', 'gzip');
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);
  // Pass to next layer of middleware
  next();
});

serverRunner.createServer(options, hostingHTTP).listen(config.SELF_HOST.port, error => {
  if (error) {
    console.warn("Something wrong with self host server.");
    console.error(error);
    return process.exit(1);
  } else {
    console.log('\x1b[36m%s\x1b[0m', ".........................................");
    console.log('\x1b[36m%s\x1b[0m', ".                                       .");
    console.log('\x1b[36m%s\x1b[0m', ". Visual-js Hosting WebServer           .");
    console.log('\x1b[36m%s\x1b[0m', ". Version 3.0.0                         .");
    console.log('\x1b[36m%s\x1b[0m', ". Node WebServer host started at " + config.SELF_HOST.port + " port.");
    console.log('\x1b[36m%s\x1b[0m', ". Thanks for using my software!         .");
    console.log('\x1b[36m%s\x1b[0m', ".........................................");
  }
});
