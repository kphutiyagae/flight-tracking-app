import L, { control, map } from 'leaflet'

function createMapArea(){
    var map = L.map('map').setView([51.505, -0.09], 13, {
        "dragging": false,
        "attribution-control": false
    });
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
}

export {createMapArea}