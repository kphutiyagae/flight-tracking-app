import { IFlight, IFlightArray } from "../types/interfaces";
import { flightCategory } from "./flight-category";
import { moveToFlight } from "./map-service";

function createFlight(flight: IFlight): HTMLDivElement {

    if (!flight) return;

    const list_component: HTMLElement = document.getElementById("container__list-component");

    const node: HTMLDivElement = document.createElement("div");

    node.id = flight.icao24 ?? '0';

    node.dataset.lat = flight.latitude ? flight.latitude.toString() : '0';

    node.dataset.long = flight.latitude ? flight.longitude.toString() : '0';

    node.classList.add("list-component__item");

    node.onclick = (event: MouseEvent) => onFlightClick(event);

    node.innerHTML = `<h3> ${flight.callsign ?? "Unavailable"}</h3>\n
        
    <p> ${flight.origin_country ?? "Unknown country"} </p>\n
    
    <p> ${(flight.category && flight.category <= 17) ? flightCategory[flight.category] : flightCategory[0]
        } </p>\n

    < /div>`;

}

function onFlightClick(event: MouseEvent): void {
    if (!event.target) return;

    const clickedElement: HTMLElement = event.target as HTMLElement;

    if (clickedElement.dataset && clickedElement.dataset.lat && clickedElement.dataset.long) {
        moveToFlight(Number(clickedElement.dataset.lat), Number(clickedElement.dataset.long));
    }
}

function addFlightsToList(flightsArray: IFlightArray): void {
    if (!flightsArray) return;

    const flightList = document.querySelector(".container__list-component");

    if (!flightList) return;

    flightsArray.states.map((flight) => {
        if (flight.length != 18 && flight[5] && flight[6]) {
            flightList.appendChild(createFlight(flight))
        }
    });

}

export {
    createFlight,
    addFlightsToList
}