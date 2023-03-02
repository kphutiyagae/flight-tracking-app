import "leaflet/dist/leaflet.css";
import "./src/stylesheets/styles.scss";
import { showFlightDataAndPopulateMap } from "./src/scripts/api-service";
import { createMapArea } from "./src/scripts/map-service";

createMapArea();

showFlightDataAndPopulateMap();
