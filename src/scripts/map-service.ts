import L from "leaflet";
import { IFlightArray } from "../types/interfaces";

const map: L.Map = L.map("map", {
    center: new L.LatLng(51.505, -0.09),
    zoom: 1,
    attributionControl: false,
    dragging: false,
});

const planeIcon = L.icon({
    iconUrl: "plane.png",
    shadowUrl: "shadow.png",
    iconSize: [30, 30],
    shadowSize: [35, 35],
    iconAnchor: [10, 10],
    shadowAnchor: [10, 10],
    popupAnchor: [-3, -76],
});

function createMapArea(): void {
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
}

function addFlightsToMap(flightsArray: IFlightArray): void {
    if (!flightsArray) return;

    flightsArray.states.map((flight) => {
        if (flight.length != 18 && flight[5] && flight[6]) {
            L.marker([Number(flight[6]), Number(flight[5])], {
                icon: planeIcon,
            }).addTo(map);
        }
    });
}

function moveToFlight(latitude: number, longtitude: number): void {
    if (!latitude || !longtitude) return;

    map.flyTo([latitude, longtitude], 10, {
        animate: true,
    });

}

export { addFlightsToMap, createMapArea, moveToFlight }