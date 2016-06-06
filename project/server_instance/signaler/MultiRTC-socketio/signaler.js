///////////////////////////////////
///////////////////////////////////
// SIGNAL SERVER 
///////////////////////////////////
///////////////////////////////////


///////////////////////////////////
//INCLUDE
///////////////////////////////////
var fs = require('fs');
var _static = require('node-static');
var file = new _static.Server('./public');
var express    = require("express");
var https = require('https');
var http = require('http');
var app = express();
///////////////////////////////////

///////////////////////////////////
//GLOBAL PARAMETERS
///////////////////////////////////
var port = 10066; // change it to 443 for ssl
///////////////////////////////////
function read(f) {return fs.readFileSync(f).toString();}
function include(f) {eval.apply(global, [read(f)]);}


var options = {
	//hostname: 'maximumroulette.com',
    //port: port,  
   // key: fs.readFileSync('/etc/httpd/ssl/maxi.key'),
   // cert: fs.readFileSync('/etc/httpd/ssl/maximumroulette_com.crt'),
	//requestCert: true,
	//rejectUnauthorized: false,
};





///////////////////////////////////
//for HTTPS-only 
///////////////////////////////////
/*

var https = require('https').createServer(options, function (request, response) {
    
	request.addListener('end', function () {
        if (request.url.search(/.png|.gif|.js|.css/g) == -1) {
            file.serveFile('/index.html', 402, {}, request, response);
        } else file.serve(request, response);
    }).resume();
	
}).listen(port);

*/



///////////////////////////////////
//for HTTP-only
///////////////////////////////////

 var http = require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        if (request.url.search(/.png|.gif|.js|.css/g) == -1) {
            file.serveFile('/index.html', 402, {}, request, response);
        } else file.serve(request, response);
    }).resume();
}).listen(port);



///////////////////////////////////
//server.listen(options.port);
//console.log('Socket server listening on port : ' , options.port);
 
 ///////////////////////////////////
 // SSL
 ///////////////////////////////////




var CHANNELS = {};
var WebSocketServer = require('websocket').server;


new WebSocketServer({
    httpServer: http, //https for ssl 
    autoAcceptConnections: false
}).on('request', onRequest);


function onRequest(socket) {
  	
  var origin = socket.origin + socket.resource;
  var websocket = socket.accept(null, origin);

    websocket.on('message', function (message) {
		
		console.log('ON MESASAGE ');
        if (message.type === 'utf8') {
            onMessage(JSON.parse(message.utf8Data), websocket);
        }
    });

    websocket.on('close', function () {
        truncateChannels(websocket);
		console.log('ON CLOSE ');
    });
}

function onMessage(message, websocket) {
 
    if (message.checkPresence)
        checkPresence(message, websocket);
    else if (message.open)
        onOpen(message, websocket);
    else
        sendMessage(message, websocket);
}

function onOpen(message, websocket) {
 
	
    var channel = CHANNELS[message.channel];

    if (channel)
        CHANNELS[message.channel][channel.length] = websocket;
    else
        CHANNELS[message.channel] = [websocket];
}

function sendMessage(message, websocket) {
    message.data = JSON.stringify(message.data);
    var channel = CHANNELS[message.channel];
    if (!channel) {
        console.error('no such channel exists');
        return;
    }

    for (var i = 0; i < channel.length; i++) {
        if (channel[i] && channel[i] != websocket) {
            try {
                channel[i].sendUTF(message.data);
            } catch (e) {}
        }
    }
}

function checkPresence(message, websocket) {
    websocket.sendUTF(JSON.stringify({
        isChannelPresent: !! CHANNELS[message.channel]
    }));
}

function swapArray(arr) {
    var swapped = [],
        length = arr.length;
    for (var i = 0; i < length; i++) {
        if (arr[i])
            swapped[swapped.length] = arr[i];
    }
    return swapped;
}

function truncateChannels(websocket) {
    for (var channel in CHANNELS) {
        var _channel = CHANNELS[channel];
        for (var i = 0; i < _channel.length; i++) {
            if (_channel[i] == websocket)
                delete _channel[i];
        }
        CHANNELS[channel] = swapArray(_channel);
        if (CHANNELS && CHANNELS[channel] && !CHANNELS[channel].length)
            delete CHANNELS[channel];
    }
}


console.log('###########################################');
console.log('listening both websocket and HTTPs at port : ' , port);
console.log('###########################################');


