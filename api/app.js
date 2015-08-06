'use strict';

var express = require('express');
var path = require('path');
var config = require('./config');
var api = require('./modules/api');

var app = express();

app.use(express.static('./public'));

app.get('/api/trucks', function (req, res) {
    api.get({
        lat: req.query.lat,
        lng: req.query.lng
    }, function(trucks) {
        res.status(200).json(trucks);
    });
});

app.get('/*', function (req, res){
    res.sendFile(path.join(__dirname, '../public', 'html/index.html'));
});

app.listen(config.port, function() {
    console.log('Listening on port %d', config.port);
});
