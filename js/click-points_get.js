// We’ll add a OSM tile layer to our map

var osmUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
    osmAttrib = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    osm = L.tileLayer(osmUrl, {
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1Ijoiam9zaGN0YXlsb3IiLCJhIjoiY2o2em10NG4wMm1sZzJ4bno2bWlrY3htdiJ9.mqshzFtuoQre061sDc2Kag',
        attribution: osmAttrib
    });

var thisMark = 'good';
var markCol = 'green';
var map = L.map('map').setView([50.9165078, -1.4311083], 1).addLayer(osm);
var reason;

console.log(data)

// L.marker([data[0].LATITUDE, data[0].LONGDITUTE]).addTo(map);

// Add the data already in the database
for (var i = 0; i < data.length; i++)
{
    L.marker([data[i].LATITUDE, data[i].LONGDITUTE]).addTo(map);
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

var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
        "amenity": "Baseball Stadium",
        "popupContent": "This is where the Rockies play!"
    },
    "geometry": {
        "type": "Point",
        "coordinates": [-104.99404, 39.75621]
    }
};

L.geoJSON(geojsonFeature, {
    onEachFeature: onEachFeature
}).addTo(map);






// Script for adding marker on map click
function onMapClick(e) {
    
    var marker;
    reason = prompt("Why did you pick this " + thisMark + " point?");

    var geojsonFeature = {
        "type": "Feature",
        "properties": {
            "cat": thisMark,
            "popupContent": reason
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
            }).bindPopup("<input type='button' value='Delete this marker' class='marker-delete-button'/>");
            marker.on("popupopen", onPopupOpen);
            return marker;
        }
    }).addTo(map);


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