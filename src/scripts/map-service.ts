import L from 'leaflet';
import { IFlight, IObserver, IofError } from '../types/interfaces';

const map: L.Map = L.map('map', {
  center: new L.LatLng(-26.2041, 28.0473),
  zoom: 4,
  attributionControl: false,
  dragging: false,
});

const planeIcon = L.icon({
  iconUrl: 'plane.png',
  shadowUrl: 'shadow.png',
  iconSize: [30, 30],
  shadowSize: [35, 35],
  iconAnchor: [10, 10],
  shadowAnchor: [10, 10],
  popupAnchor: [-3, -76],
});

function createMapArea(): void {
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution:
            '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
}

function addFlightsToMap(flightsArray: IFlight[]): void {
  if (!flightsArray) return;
  Array.from(flightsArray).map((flight: IFlight) => {
    if (flight.latitude && flight.longitude) {
      L.marker([Number(flight.latitude), Number(flight.longitude)], {
        icon: planeIcon,
      }).addTo(map);
    }
  });
}

function moveToFlight(latitude: number, longtitude: number): void {
  if (!latitude || !longtitude) return;
  map.invalidateSize();
  map.flyTo([latitude, longtitude], 10, {
    animate: true,
  });
}

const mapObserver: IObserver = {
  next: (flightDataArray: IFlight[] | IofError) => {
    addFlightsToMap(flightDataArray as IFlight[]);
  },
  error: (error: IofError): IofError => error,
};

export {
  addFlightsToMap, createMapArea, moveToFlight, mapObserver,
};
