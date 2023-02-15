import L, { control, map } from 'leaflet'

function createMapArea(flightsArray){
    var map = L.map('map').setView([51.505, -0.09], 13, {
        "dragging": false,
        "attribution-control": false
    });
    
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    var planeIcon = L.icon({
        iconUrl: '../images/plane.png',
        shadowUrl: '../images/shadow.png',
        iconSize: [50, 50],
        shadowSize: [60, 64],
        iconAnchor: [10,10],
        shadowAnchor: [10,10],
        popupAnchor: [-3, -76]
    })
    flightsArray.forEach(flight => {
        if(flight[6] && flight[5])
        L.marker([flight[6],flight[5]]).addTo(map)
    });
}

//automatically zom to closest.
export {createMapArea}