import { baseUrl } from "./routes";

import {
	isRequestInCache,
	addRequestToCache,
	getCachedRequest,
} from "./web-storage";

import { flightData$ } from "./observables";
import { mapObserver } from "./map-service";
import { listObserver } from "./dom-manip";

async function showFlightDataAndPopulateMap() {
	flightData$.subscribe(mapObserver);
	flightData$.subscribe(listObserver);
}

export { showFlightDataAndPopulateMap };
