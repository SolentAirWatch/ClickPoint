var goodPoints = L.layerGroup();
var badPoints = L.layerGroup();
var mbAttr = 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoiam9zaGN0YXlsb3IiLCJhIjoiY2o2em10NG4wMm1sZzJ4bno2bWlrY3htdiJ9.mqshzFtuoQre061sDc2Kag';

var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});


// initialize the map on the "map" div with a given center and zoom
var map = L.map('map', {
    center: [50.9137997,-1.4705325], // southampton
    zoom: 10,
    // zoom: 6,
    layers: [streets, goodPoints, badPoints]
});

// define the map tiles for use
var baseLayers = {
    "Grayscale": grayscale,
    "Streets": streets
};

// define the layers for user points
var overlays = {
    "Good Air": goodPoints,
    "Bad Air": badPoints
};

// define the form for the pop-up    
var popupForm = '<form id="popup-form" class="form-container"> \
                <h2>Add a point:</h2>\
                <strong> The air quality here is: </strong> <br> \
                <fieldset> \
                <label class="radio-inline"> \
                <input type="radio" class="radio" name="goodBad" value = "good" id="good">Good \
                </label> \
                <label class="radio-inline"> \
                <input type="radio" class="radio" name="goodBad" value = "bad" id="bad">Bad \
                </label> <br> \
                </fieldset> \
                <label for="location"><b>Location Name</b></label> \
                <input type="text" placeholder="eg. Redbridge flyover" id="locName" > \
                <label for="reason"><b>Why are you adding this point? - be specific!</b></label> \
                <input type="text" placeholder="eg. There is a traffic jam every saturday 11am" id="reason" > \
                <label for="solution"><b>How would you improve air quality at this location? (If you ran the city)</b></label> \
                <input type="text" placeholder="eg. I\'d close the road when when school starts and stops" id="improvement"> \
                <button type="button" id="btn-submit" class="btn">Save</button> \
                <button type="button" id="btn-delete" class="btn">Delete</button> \
            </form>';

userIcon = {
    icon: L.AwesomeMarkers.icon({
        icon: 'info', 
        prefix: 'fa', 
        markerColor: 'blue'
        }),
    riseOnHover: true,
    draggable: true
    };

var greenMarker =  L.AwesomeMarkers.icon({
    icon: 'info',
    markerColor: "green"
});

var redMarker =  L.AwesomeMarkers.icon({
    icon: 'info',
    markerColor: "red"
});

// Script for adding marker on map click
function onMapClick(e) {
//    var popup = L.popup({
//        closeButton: true})
//        .setLatLng(e.latlng)
//        .setContent(popupForm)
//        .openOn(map);

    // define a geoJSON variable to hold each o the user points
    var newFeature = {
        "type": "Feature",
        "properties": {
            "type": '',
            "name": '',
            "reason": '',
            "improvement": ''
            // "popupContent": reason
            },
        "geometry": {
            "type": "Point",
            "coordinates": [e.latlng.lat, e.latlng.lng]
            }
        };
    
        L.geoJson(newFeature, {
            pointToLayer: function (feature, latlng) {
                var marker = L.marker(newFeature.geometry.coordinates, userIcon).bindPopup(
                    popupForm,{closeButton: false});
                marker.on("popupopen", onPopupFormOpen);
                return marker;
                marker.openPopup();
            }
        }).addTo(map);
}
    

// Function to send the users point to php via ajax and onto database
function savePoints(newPoints) {
    console.log('debug: inside save function');
    
    for (var i = 0; i < newPoints.length; i++) {
        
        $.post("savePoints.php", {
            NAME: newPoints[i].properties.name,
            LATITUDE: newPoints[i].geometry.coordinates[1],
            LONGDITUTE: newPoints[i].geometry.coordinates[0],
            TYPE: newPoints[i].properties.type,
            REASON: newPoints[i].properties.reason,
            IMPROVEMENT: newPoints[i].properties.improvement
        }).done(function() {
            console.log("saved point " + toString(i))
        });
    }
    alert( "success");
}

function validateForm() {
    if (x == "") {
        alert("fields cannot be empty")
        return false;
    }
}

// Function to handle delete as well as other events on marker popup open
function onPopupFormOpen() {
    var tempMarker = this;
    var tempMarkerGeoJSON = this.toGeoJSON();
    var lID = tempMarker._leaflet_id; // Getting Leaflet ID of this marker
    
    switch (tempMarkerGeoJSON.properties.type) {
        case "good":
            $("#good").prop("checked", true);
            $("#bad").prop("checked", false);
            break;
        case "bad":
            $("#good").prop("checked", false);
            $("#bad").prop("checked", true);
            break;    
    }
    
    $("#locName").val(tempMarkerGeoJSON.properties.name);
    $("#reason").val(tempMarkerGeoJSON.properties.reason);
    $("#improvement").val(tempMarkerGeoJSON.properties.improvement)
            
    $("#btn-submit").on("click", onPointSubmit);
    
    function onPointSubmit () {
        tempMarkerGeoJSON.properties.type = $("input[name='goodBad']:checked").val();
        tempMarkerGeoJSON.properties.name = $("#locName").val();
        tempMarkerGeoJSON.properties.reason = $("#reason").val();
        tempMarkerGeoJSON.properties.improvement = $("#improvement").val();
        tempMarker.closePopup();
    }
    
    $("#btn-delete").click(function () {
        map.removeLayer(tempMarker);   // To remove marker on click of delete
    });
    
    console.log(tempMarkerGeoJSON);
}


// getting all the markers at once
function getAllMarkers() {
    
    var allMarkersObjArray = []; //new Array();
    var allMarkersGeoJsonArray = []; //new Array();

    $.each(map._layers, function (ml) {
        
        //console.log(map._layers)
        if (map._layers[ml].feature) {
            allMarkersObjArray.push(this);
            allMarkersGeoJsonArray.push(this.toGeoJSON());
        }
    });
    savePoints(allMarkersGeoJsonArray);

}

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

L.control.layers(baseLayers, overlays).addTo(map);
map.on('click', onMapClick);                // attach function for map click event 
$(".btn-done").on("click", getAllMarkers);


$.validate({
    lang: 'en'
});
