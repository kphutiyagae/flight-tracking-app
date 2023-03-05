import 'leaflet/dist/leaflet.css';
import './dist/stylesheets/styles.css';
import showFlightDataAndPopulateMap from './src/scripts/api-service';
import { createMapArea } from './src/scripts/map-service';

createMapArea();

showFlightDataAndPopulateMap();
