import { IFlight, IObserver, IofError } from '../types/interfaces';
import { flightCategory } from './flight-category';
import { moveToFlight } from './map-service';

function createFlight(flight: IFlight): HTMLDivElement {

    if (!flight) return null;

    const node: HTMLDivElement = document.createElement('div');

    node.id = flight.icao24 ?? '0';

    node.dataset.lat = flight.latitude ? flight.latitude.toString() : '0';

    node.dataset.long = flight.latitude ? flight.longitude.toString() : '0';

    node.classList.add('list-component__item', 'bg-secondary-theme-color', 'pt-4', 'm-1', 'pb-3.5', 'rounded-md', 'cursor-pointer');

    node.onclick = (event: MouseEvent): void => onFlightClick(event as MouseEvent);

    node.innerHTML = `<h3 class="text-3xl ml-6 mb-5 text-text-color-title w-min"> ${flight.callsign ?? 'Unavailable'}</h3>\n
        
    <p class="ml-7 text-lg font-bold text-text-color-subtitle w-fit" > ${flight.origin_country ?? 'Unknown country'} </p>\n
    
    <p class="ml-7 text-sm font-light text-text-color-subtitle w-fit"> ${(flight.category && flight.category <= 17) ? flightCategory[flight.category] : flightCategory[0]} </p>\n`;

    return node;
}

function onFlightClick(event: MouseEvent): void {
    if (!event.target) return;

    const clickedElement: HTMLElement = event.target as HTMLElement;

    if (clickedElement.dataset && clickedElement.dataset.lat && clickedElement.dataset.long) {
        moveToFlight(Number(clickedElement.dataset.lat), Number(clickedElement.dataset.long));
    }
}

function addFlightsToList(flightsArray: IFlight[]): void {
    if (!flightsArray) return;
    const flightList = document.querySelector('#container__list-component');
    if (!flightList) return;
    flightsArray.map((flight: IFlight) => {
        if (flight.category && flight.longitude && flight.latitude) {
            const flightDivToBeRendered: HTMLDivElement = createFlight(flight);
            if (!flightDivToBeRendered)
                return;
            flightList.appendChild(flightDivToBeRendered);

        }
    });

}

const listObserver: IObserver = {
    next: (flightDataArray: IFlight[] | IofError) => {
        addFlightsToList(flightDataArray as IFlight[]);
    },
    error: (error: IofError) => {
        return error;
    },
};


export {
    createFlight,
    addFlightsToList,
    listObserver
}