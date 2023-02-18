import "leaflet/dist/leaflet.css";
import {
	bindOnChangeToFilterOptions,
	bindOnClicksToButtons,
	populateListComponent,
	toggleFilterOptionsMenu,
} from "./src/scripts/dom-manip";
import "./src/stylesheets/styles.scss";
import { getAllStates } from "./src/scripts/api-service";
import { createMapArea } from "./src/scripts/map-service";

let flightsArray = [];

bindOnClicksToButtons();

bindOnChangeToFilterOptions();

const statesVect = getAllStates();

statesVect.then((data) => {
	flightsArray = data;
	createMapArea(data);
	populateListComponent(data, 0, 12);
});
