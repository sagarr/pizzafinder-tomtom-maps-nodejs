tomtom.setImagePath("/images");

window.onload = function() {

	/* global var map */
	map = new tomtom.Map({
		domNode: "map",
		cookie: false,
		scale: true,
		panZoomBar: true
	});

	map.on("load", function() {
		console.log("map loaded");
	});

}

function panTo(loc) {
	var lat_lon = loc.split(',');
	map.setZoom(15);
	map.panTo([eval(lat_lon[0]), eval(lat_lon[1])]);	
}

function findPizza(loc) {
	$.get('/api/pizzas?near=' + loc, function(data) {
		var d = JSON.parse(data);
		d.geoResponse.geoResult.forEach(function(result) {
				var marker = new tomtom.Marker([result.latitude, result.longitude]);
				marker.bindPopup(result.formattedAddress);
				map.addLayer(marker);
			});
	})
	.fail(function() {
		$('.error').html('error: something went wrong!');
	});
}
