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
var getData = function(map) {
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
var customBuild = function(data, map) {
	var female = [];
	var male =[];
	var kill =[];
	var hit = [];
	var seattle =[];
	var all = [];
	var maleKilled = 0;
	var maleHit = 0;
	var femaleKilled =0;
	var femaleHit = 0;

	data.map(function(dat) {	
		var color;
		var name = dat["Victim Name"];
		var age = dat["Victim's Age"];
		var gender = dat["Victim's Gender"];
		var summary = dat["Summary"];
		var state = dat["State"];
		var killed = dat["Hit or Killed?"];
		var link = dat["Source Link"];

		if (killed == "killed" || killed == "Killed") {
			color = 'red';
		}else {
			color = 'blue';
		}

		if(gender == "Male" && (killed == "killed" || killed == "Killed")) {
				maleKilled++;
		}
		if(gender =="Male" && (killed == "hit" || killed =="Hit")) {
			maleHit++;
		}
		if(gender == "Female" && (killed == "killed" || killed =="Killed")) {
			femaleKilled++;
		}
		if(gender == "Female" && (killed == "hit" || killed =="Hit")) {
			femaleHit++;
		}
		if(gender == "male" && (killed == "killed" || killed == "Killed")) {
				maleKilled++;
		}
		if(gender =="male" && (killed == "hit" || killed =="Hit")) {
			maleHit++;
		}
		if(gender == "female" && (killed == "killed" || killed =="Killed")) {
			femaleKilled++;
		}
		if(gender == "female" && (killed == "hit" || killed =="Hit")) {
			femaleHit++;
		}

	var circle = new L.circleMarker([dat.lat, dat.lng], {
			radius: (age % 20),
			color:color
		});
			
			var d;
			if(name == undefined) {
					d ="Name Unknown ";
			}else {
				d = "Name: " + name + "	";
			}if(age == undefined) {
				d =  d + "Age unknown ";
			}else {
				d = d + "Age: " + age+ " ";
			}if (state == undefined) {
				d = "State unknown "
			}else {
				d = d + "State: " + state+ " ";
			}if (summary == undefined) {
				d = d+ "No Summary ";
			}else {
				d = d+ "Summary: " + summary+ " "
			}if (killed == undefined) {
				d = d+"Unknown Cause ";
			}else {
				d = d+"Hit or Killed: " + killed + " "
			}if (link == undefined) {
				d = d + "No Source"; 
			}else {
				d = d+ "Source: " + link+ " ";
			}if (gender == undefined) {
				d = d+ "Unknown Gender";
			}else {
				d = d+ "Gender: " + gender;
			}
	
		circle.bindPopup(d);

		if(gender == "female" || gender =="Female") {
			female.push(circle);
		}else {
			male.push(circle);
		}

		if(killed == "Killed" || killed == "killed") {
			kill.push(circle);
		}else {
			hit.push(circle);
		}
		all.push(circle);
	});

var allMap = L.layerGroup(all);
var males = L.layerGroup(male);
var females = L.layerGroup(female);
var died = L.layerGroup(kill);
var hits = L.layerGroup(hit);



var genderGroup = {
	"Females": females,
	"Males": males
}

var survivalGroup = {
	"Killed": died,
	"Hit": hits
}

L.control.layers(genderGroup, survivalGroup).addTo(map);
allMap.addTo(map);


document.getElementById("maleKilled").innerHTML = maleKilled;
document.getElementById("maleHit").innerHTML = maleHit;
 document.getElementById("femaleKilled").innerHTML = femaleKilled; 
 document.getElementById("femaleHit").innerHTML = femaleHit; 

}

