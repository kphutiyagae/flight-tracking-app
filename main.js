import "leaflet/dist/leaflet.css";
import { populateListComponent } from "./src/scripts/dom-manip";
import "./src/stylesheets/styles.scss";
import { getAllStates } from "./src/scripts/api-service";
import { createMapArea } from "./src/scripts/map-service";

const statesVect = getAllStates();

statesVect.then((data) => {
	console.log(data);
	createMapArea(data);
	populateListComponent(data, 0, 12);
});
