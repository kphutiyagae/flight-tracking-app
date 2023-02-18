import "leaflet/dist/leaflet.css";
import {
	bindOnClicksToButtons,
	populateListComponent,
	toggleFilterOptionsMenu,
} from "./src/scripts/dom-manip";
import "./src/stylesheets/styles.scss";
import { getAllStates } from "./src/scripts/api-service";
import { createMapArea } from "./src/scripts/map-service";

let flightsArray = [];

bindOnClicksToButtons();

const statesVect = getAllStates();

statesVect.then((data) => {
	flightsArray = data;
	console.log(flightsArray);
	createMapArea(data);
	populateListComponent(data, 0, 12);
});
