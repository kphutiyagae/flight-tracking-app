import "leaflet/dist/leaflet.css";
import {
	addFilterOptions,
	bindOnChangeToFilterOptions,
	bindOnClicksToButtons,
} from "./src/scripts/dom-manip";
import "./src/stylesheets/styles.scss";
import { showFlightDataAndPopulateMap } from "./src/scripts/api-service";
import { createMapArea } from "./src/scripts/map-service";

addFilterOptions();

bindOnClicksToButtons();

bindOnChangeToFilterOptions();

createMapArea();

showFlightDataAndPopulateMap();
