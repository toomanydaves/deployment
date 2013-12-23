'use strict';

/**
A server to:
* Serve static files for clients
* Mount the API server
*/
var 
fs = require('fs'),
express = require('express'),
server = express(),
cache = { };

server.configure(function ( ) {
    // Log requests.
    server.use(express.logger('dev'));

    // Mount API.
    server.use(express.vhost('api.*', require('./api/server')));
});

// Serve static client files.
server.use(express.static(__dirname + '/static'));

// Serve `/index.html` when url doesn't end with a file extenstion.
server.use(
    function (req, res, next) {
        if ( !(/\.\w+$/.test(req.url)) ) {
            // ... serve index.html.
            fs.readFile(path + '/index.html', function (err, data) {
                res.end(data);
            });
        }
    
        next();
    }
);

module.exports = server;
