// Function to draw your map
var drawMap = function(location, zoom) {

  // Create map and set view

var map = L.map('mapContainer').setView(location, zoom)

  // Create a tile layer variable using the appropriate url

var layer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png')

  // Add the layer to your map
 layer.addTo(map)

  // Execute your function to get data
  getData(map)
}

// Function for getting data
var getData = function() {
	$.ajax({
		  url: "data/response.json",
		  type: "get",
		  success:function(dat) {
		  data = dat
		  customBuild(data, map)
		  },
		dataType: "json"
	})
}

// Loop through your data and add the appropriate layers and points
var customBuild = function() {
	var female = [];
	var male =[];
	var killed =[];
	var hit = [];
	var seattle =[];


	data.map(function(dat) {	
		var color;
		var name = dat["Victim Name"];
		var age = dat["Victim's Age"];
		var gender = dat["Victim's Gender"];
		var summary = dat["Summary"];
		var state = dat["State"];
		var killed = dat["Hit or Killed?"];
		var link = dat["Source Link"];

		if (gender == "Female") {
			color: red;
		}else {
			color: blue;
		}

		var circle = new L.circleMarker([dat.lat, dat.lng], {
			color: color}) 
			
			var d;
			if(name == undefined) {
					d ="Name Unknown";
			}else {
				d = "Name: " + name;
			}if(age == undefined) {
				d = "Age unknown";
			}else {
				d = "Age: " + age;
			}if (state == undefined) {
				d = "State unknown"
			}else {
				d = "State: " + State;
			}if (summary == undefined) {
				d = "No Summary";
			}else {
				d = "Summary: " + summary
			}if (killed == undefined) {
				d = "Unknown Cause";
			}else {
				d = "Hit or Killed: " + killed
			}if (link == undefined) {
				d = "No Source"; 
			}else {
				d = "Source: " + link;
			}if (gender == undefined) {
				d = "Unknown Gender";
			}else {
				d = "Gender: " + gender;
			}
	
		circle.bindPopup(d)

		if(gender == )
	}

	

		// Once layers are on the map, add a leaflet controller that shows/hides layers
  
}

