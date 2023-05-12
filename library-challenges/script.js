(function(){
    'use strict';

    // add your script here

    var map = L.map('map').setView([37.986881, -122.587143], 13);

    var marker1 = L.marker([37.981860, -122.568150]).addTo(map);
    var marker2 = L.marker([37.990043, -122.592380]).addTo(map);
    var circle = L.circle([37.973523, -122.530963], {
        color: 'darkgrey',
        fillColor: 'darkgrey',
        fillOpacity: 0.4,
        radius: 800
    }).addTo(map);

    marker1.bindPopup("My Highschool");
    marker2.bindPopup("The local library");
    circle.bindPopup("Some cool thrift shops in this area");

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    
}());