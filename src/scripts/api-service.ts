import { baseUrl } from "./routes";
import {
    isRequestInCache,
    addRequestToCache,
    getCachedRequest,
} from "./web-storage";

import { flightData$ } from "./observables";
import { mapObserver } from "./dom-manipulation";
import { listObserver } from "./dom-manip";

async function showFlightDataAndPopulateMap(): Promise<void> {
    flightData$.subscribe(mapObserver);
    flightData$.subscribe(listObserver);
}

export { showFlightDataAndPopulateMap };