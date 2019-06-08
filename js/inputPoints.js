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
//    center: [50.9113644,-1.4228106], // southampton
    center: [51.454,-2.601092], // Bristol
    zoom: 14,
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
var popupForm = '<form id="popup-form" action="" class="form-container"> \
                <h2>Add a marker:</h2>\
                <strong> The air quality here is: </strong> <br> \
                <div id="goodBad" class="btn-group btn-group-toggle" role="group" data-toggle="buttons"> \
                  <label class="btn btn-outline-success labGoodBad" id="labGood"> \
                    <input type="radio" name="pointType" id="good" value = "good" autocomplete="off" required> Good \
                  </label> \
                  <label class="btn btn-outline-danger labGoodBad" id="labBad"> \
                    <input type="radio" name="pointType" id="bad" value = "bad" autocomplete="off" required> Bad \
                  </label> \
                </div> \
                <br> \
                <label for="locName"><b>Location Name</b></label> \
                <input type="text" placeholder="eg. Redbridge flyover" id="locName" maxlength="250" required> \
                <label for="reason"><b>Why are you adding this point? - try to be specific</b></label><br> \
                <textarea rows="4" placeholder="eg. There is a traffic jam every saturday 11am" class="textarea" id="reason" maxlength="250" required> </textarea>\
                <label for="solution"><b>How would you improve air quality at this location? (If you ran the city)</b></label> \
                <textarea rows="4" placeholder="eg. I\'d close the road when when school starts and stops" id="improvement" maxlength="250" class="textarea" required> </textarea> \
                <button type="button" id="btn-submit" class="btn btn-primary" >Save</button> \
                <button type="button" id="btn-delete" class="btn btn-secondary">Delete</button> \
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

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = ["Good", "Bad "],
        labels = ["images/greenMarker.png","images/redMarker.png"];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            grades[i] + (" <img src="+ labels[i] +" height='40' width='30'>") +'<br>';
    }
    return div;
};

legend.addTo(map);

// Script for adding markers when the user clicks on the map.
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
                    popupForm,{closeButton: false, 
                               minWidth:400});
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
            LONGITUDE: newPoints[i].geometry.coordinates[0],
            TYPE: newPoints[i].properties.type,
            REASON: newPoints[i].properties.reason,
            IMPROVEMENT: newPoints[i].properties.improvement
        }).done(function() {
            console.log("saved point " + toString(i))
        });
    }
//        window.location.href = 'https://goo.gl/forms/HH0FBEK5O6kEMWeQ2';
}

// inline validation of fields
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
    $(':input:checked').parent('.btn').addClass('active');
    
    $("#locName").val(tempMarkerGeoJSON.properties.name);
    $("#reason").val(tempMarkerGeoJSON.properties.reason);
    $("#improvement").val(tempMarkerGeoJSON.properties.improvement)
            
    $("#btn-submit").on("click", onPointSubmit);
    
    function onPointSubmit () {
        tempMarkerGeoJSON.properties.type = $("input[name='pointType']:checked").val();
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
    popUpContent =  '<h4>' + data[i].NAME + '</h4> \
                    <h6> Reason for ' + data[i].type + ' air: </h6> \
                    <p>' + data[i].reason + '</p> \
                    <h6> Suggested improvement: </h6> \
                    <p>' + data[i].improvement + '</p>'
        
    switch (data[i].type) {
        case 'good':
            L.marker([data[i].LATITUDE, data[i].LONGITUDE], {
                icon: greenMarker,
                riseOnHover: true
            }).bindPopup(popUpContent).addTo(goodPoints);
            break;
        case 'bad':
            L.marker([data[i].LATITUDE, data[i].LONGITUDE], {
                icon: redMarker,
                riseOnHover: true                
            }).bindPopup(popUpContent).addTo(badPoints);
            break;
    }
}

L.control.layers(baseLayers, overlays).addTo(map);
map.on('click', onMapClick);                // attach function for map click event 
$(".btn-done").on("click", getAllMarkers);

// show popup on page load
$("#myModal").modal()

$.validate({
    lang: 'en'
});
