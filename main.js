import "leaflet/dist/leaflet.css";
import {
	addFilterOptions,
	bindOnChangeToFilterOptions,
	bindOnClicksToButtons,
	addFlightsToList,
} from "./src/scripts/dom-manip";
import "./src/stylesheets/styles.scss";
import { getAllStates, getAllStatesV2 } from "./src/scripts/api-service";
import { addFlightsToMap, createMapArea } from "./src/scripts/map-service";
import { flightData$ } from "./src/scripts/observables";
import { isRequestInCache } from "./src/scripts/web-storage";

addFilterOptions();

bindOnClicksToButtons();

bindOnChangeToFilterOptions();
/*
const statesVect = getAllStates();

statesVect.then((data) => {
	if (data.length >= 30) {
		createMapArea();

		addFlightsToMap(data.slice(0, 30));

		addFlightsToList(data.slice(0, 30));
	}
});

*/
createMapArea();

getAllStatesV2();
