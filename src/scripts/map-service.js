import L from "leaflet";

const map = L.map("map").setView([51.505, -0.09], 13, {
	dragging: false,
	"attribution-control": false,
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

function createMapArea() {
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);
}

function addFlightsToMap(flightsArray, numberOfFlights) {
	if (flightsArray) {
		for (let i = 0; i < numberOfFlights; i++) {
			if (
				flightsArray[i].length <= 18 &&
				flightsArray[i][5] &&
				flightsArray[i][6]
			) {
				L.marker([flightsArray[i][6], flightsArray[i][5]], {
					icon: planeIcon,
				}).addTo(map);
			}
		}

		moveToFlight(flightsArray[0][6], flightsArray[0][5]);
	}
}

function moveToFlight(latitude, longtitude) {
	if (latitude && longtitude) {
		map.flyTo([latitude, longtitude], 10, {
			animate: true,
		});
	}
}

export { createMapArea, moveToFlight, addFlightsToMap };
