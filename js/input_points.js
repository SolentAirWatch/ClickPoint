var goodPoints = L.layerGroup();
var badPoints = L.layerGroup();

var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9zaGN0YXlsb3IiLCJhIjoiY2o2em10NG4wMm1sZzJ4bno2bWlrY3htdiJ9.mqshzFtuoQre061sDc2Kag';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

var map = L.map('map', {
    center: [39.73, -104.99],
    zoom: 1,
    layers: [streets, goodPoints, badPoints]
});

var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

var overlays = {
    "Good Air": goodPoints,
    "Bad Air": badPoints
};

var newPoint = {
        'name': '',
        'coordinates': [],
        'type': '',
        'reason': ''
    };

L.control.layers(baseLayers, overlays).addTo(map);


var thisMark = 'good';
var markCol = 'green';
//var map = L.map('map').setView([50.9165078, -1.4311083], 1).addLayer(osm);
var reason;

var greenMarker =  L.AwesomeMarkers.icon({
    icon: 'info',
    markerColor: "green"
});

var redMarker =  L.AwesomeMarkers.icon({
    icon: 'info',
    markerColor: "red"
});

// L.marker([data[0].LATITUDE, data[0].LONGDITUTE]).addTo(map);

// Add the data already in the database
for (var i = 0; i < data.length; i++) {
    switch (data[i].type) {
        case 'good':
            L.marker([data[i].LATITUDE, data[i].LONGDITUTE], {
                icon: greenMarker,
                riseOnHover: true
            }).bindPopup(data[i].reason).addTo(goodPoints);
            break;
        case 'bad':
            L.marker([data[i].LATITUDE, data[i].LONGDITUTE], {
                icon: redMarker,
                riseOnHover: true                
            }).bindPopup(data[i].reason).addTo(badPoints);
            break;
    }
}



// initialize the map on the "map" div with a given center and zoom
// var map = L.map('map').setView([43.665,7.193], 6);

// attaching function on map click
map.on('click', onMapClick);

function onEachFeature(feature, layer) {
    // does this feature have a property named popupContent?
    if (feature.properties && feature.properties.popupContent) {
        layer.bindPopup(feature.properties.popupContent);
    }
}


// Script for adding marker on map click
function onMapClick(e) { 
    var marker;
    reason = prompt("Why did you pick this " + thisMark + " point?");

    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "cat": thisMark,
            // "popupContent": reason
        },
        "geometry": {
            "type": "Point",
            "coordinates": [e.latlng.lat, e.latlng.lng]
        }
    };

    // ask the user why they picked this point
    L.geoJson(geojsonFeature, {
        pointToLayer: function (feature, latlng) {
            marker = L.marker(e.latlng, {
                icon: L.AwesomeMarkers.icon({icon: 'info', prefix: 'fa', markerColor: markCol}),
                title: reason,
                popupContent: reason,
                alt: "Resource Location",
                riseOnHover: true,
                draggable: true
            }).bindPopup(
            '<b>' + thisMark + ' air </b> <br> <br>' +
            '<b> Reason: </b> <br>' + 
            reason + 
            '<br> <br> <br>' + 
            "<input type='button' value='Delete this marker' class='marker-delete-button'/>"
            ); // this may be the line that stops it closing
            marker.openPopup();
            return marker;
        }
    }).addTo(map);
    
    newPoint = {
        'name': 'testMarker',
        'coordinates': [e.latlng.lat, e.latlng.lng],
        'type': thisMark,
        'reason': reason
    }
    saveMapPoint(newPoint)
}

// Function to send the users point to php via ajax and onto database
function saveMapPoint(newPoint) {
    console.log('debug: inside save function');
    $.post("savePoints.php", {
        NAME: newPoint["name"],
        LATITUDE: String(newPoint.coordinates[0]),
        LONGDITUTE: String(newPoint.coordinates[1]),
        type: newPoint["type"],
        reason: newPoint["reason"]    
    }).done(function() {
        alert( "success" );
    });
}


// Function to handle delete as well as other events on marker popup open
function onPopupOpen() {

    var tempMarker = this;

    var tempMarkerGeoJSON = this.toGeoJSON();

    var lID = tempMarker._leaflet_id; // Getting Leaflet ID of this marker

    // To remove marker on click of delete
    $(".marker-delete-button:visible").click(function () {
        map.removeLayer(tempMarker);
    });
}


// getting all the markers at once
function getAllMarkers() {

    var allMarkersObjArray = []; //new Array();
    var allMarkersGeoJsonArray = []; //new Array();

    $.each(map._layers, function (ml) {
        
        //console.log(map._layers)
        if (map._layers[ml].feature) {
            allMarkersObjArray.push(this);
            allMarkersGeoJsonArray.push(JSON.stringify(this.toGeoJSON()));
        }
    });

    console.log(allMarkersObjArray);
    alert("total Markers : " + allMarkersGeoJsonArray.length + "\n\n" + allMarkersGeoJsonArray + "\n\n Also see your console for object view of this array");
}

$(".btn-done").on("click", getAllMarkers);

$(".btn-good").on("click", function () {
        thisMark = "good";
        markCol = "green";
});

$(".btn-bad").on("click", function () {
        thisMark = "bad";
        markCol = "red";
});