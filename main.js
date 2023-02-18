import "leaflet/dist/leaflet.css";
import {
	addFilterOptions,
	bindOnChangeToFilterOptions,
	bindOnClicksToButtons,
	populateListComponent,
	toggleFilterOptionsMenu,
} from "./src/scripts/dom-manip";
import "./src/stylesheets/styles.scss";
import { getAllStates } from "./src/scripts/api-service";
import { addFlightsToMap, createMapArea } from "./src/scripts/map-service";

let flightsArray = [];

addFilterOptions();

bindOnClicksToButtons();

bindOnChangeToFilterOptions();

const statesVect = getAllStates();

statesVect.then((data) => {
	flightsArray = data;
	createMapArea();
	addFlightsToMap(data, 20);
	populateListComponent(data, 20);
});
