import { flightData$ } from "./observables";
import { mapObserver } from "./map-service";
import { listObserver } from "./dom-manipulation";

function showFlightDataAndPopulateMap(): void {
    flightData$.subscribe(mapObserver);
    flightData$.subscribe(listObserver);
}

export { showFlightDataAndPopulateMap };

