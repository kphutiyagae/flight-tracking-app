import L from "leaflet";

const map = L.map("map").setView([51.505, -0.09], 13, {
	dragging: false,
	"attribution-control": false,
});

function createMapArea(flightsArray) {
	L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
		maxZoom: 19,
		attribution:
			'&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
	}).addTo(map);

	const planeIcon = L.icon({
		iconUrl: "plane.png",
		shadowUrl: "shadow.png",
		iconSize: [50, 50],
		shadowSize: [60, 64],
		iconAnchor: [10, 10],
		shadowAnchor: [10, 10],
		popupAnchor: [-3, -76],
	});

	flightsArray.forEach((flight) => {
		if (flight[6] && flight[5])
			L.marker([flight[6], flight[5]], { icon: planeIcon }).addTo(map);
	});
}

function moveToFlight(latitude, longtitude) {
	if (latitude && longtitude) {
		map.flyTo([latitude, longtitude], 10, {
			animate: true,
		});
	}
}

export { createMapArea, moveToFlight };
