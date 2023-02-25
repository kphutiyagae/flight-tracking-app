import { baseUrl } from "./routes";

import {
	isRequestInCache,
	addRequestToCache,
	getCachedRequest,
} from "./web-storage";

import { flightData$ } from "./observables";
import { mapObserver } from "./map-service";
import { switchMap } from "rxjs/operators";
import { listObserver } from "./dom-manip";
async function getAllStates() {
	if (!(await isRequestInCache(`${baseUrl}/states/all?extended=1`))) {
		addRequestToCache(`${baseUrl}/states/all?extended=1`);
		return await getCachedRequest(`${baseUrl}/states/all?extended=1`)
			.then((res) => res.json())
			.then((data) => {
				return data.states;
			});
	} else {
		return getCachedRequest(`${baseUrl}/states/all?extended=1`)
			.then((res) => res.json())
			.then((data) => {
				return data.states;
			});
	}
}

async function getAllStatesV2() {
	if (!(await isRequestInCache(`${baseUrl}/states/all?extended=1`))) {
		flightData$.subscribe(mapObserver);
		flightData$.subscribe(listObserver);
	} else {
	}
}

export { getAllStates, getAllStatesV2 };
