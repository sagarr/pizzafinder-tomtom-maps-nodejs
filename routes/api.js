var express = require('express');
var router = express.Router();

var http = require('http');
var util = require('util');

var tomtom_geocode_api = 'http://api.tomtom.com/lbs/services/geocode/4/geocode?key=%s&query=Pizza&L=Pune&format=json';

router.get('/pizzas', function(req, res) {

	http.get(util.format(tomtom_geocode_api, req.key), function(response) {
		var result = "";
		response.on('data', function(chunk) {
			result += chunk;
		});
		
		response.on('end', function() {
			res.json(result);
		});
	}).end();
	
});

module.exports = router;