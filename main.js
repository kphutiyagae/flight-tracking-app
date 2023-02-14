import "./src/stylesheets/styles.scss"
import { createMapArea } from "./src/scripts/map-service"
import { getAllStates } from "./src/scripts/api-service";
import 'leaflet/dist/leaflet.css'
import { createListItem, populateListComponent, getClass } from "./src/scripts/dom-manip";

createMapArea();


const statesVect = getAllStates();

statesVect.then((data) => {
    console.log(data)
    populateListComponent(data, 0, 12)})
