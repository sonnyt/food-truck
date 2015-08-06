'use strict';

var request = require('request');
var config = require('../config');
var API = {};

API.get = function(location, cb) {
    request({
        url: config.api.url,
        headers: {
            'X-App-Token': config.api.token
        },
        qs: {
            '$where': 'within_circle(location,'+ location.lat +', '+ location.lng +' , 804.67200)'
        }
    }, function(error, response, body) {
        cb(JSON.parse(body));
    });
};

module.exports = API;