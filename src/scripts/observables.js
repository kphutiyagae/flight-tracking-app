import { Subject, iif, from } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, map, catchError } from "rxjs/operators";
import {
	getCachedRequest,
	addRequestToCache,
	isRequestInCache,
} from "./web-storage";

import { baseUrl } from "./routes";
const flightData$ = new Subject();

//Derived from rxjs documentation: https://rxjs.dev/api/fetch/fromFetch
const requestedFlightData$ = fromFetch(
	`${baseUrl}/states//all?extended=1`
).pipe(
	switchMap((response) => {
		if (response.ok) {
			addRequestToCache(`${baseUrl}/states//all?extended=1`);
			return response.json();
		} else {
			return of({ error: true, message: `Error ${response.status}` });
		}
	}),
	map((data) => {
		if (data.states.length >= 20) {
			return data.states.slice(0, 20);
		} else {
			return data.states;
		}
	}),
	catchError((error) => {
		return of({ error: true, message: `Error ${response.status}` });
	})
);

const cachedFlightData$ = from(
	getCachedRequest(`${baseUrl}/states//all?extended=1`)
).pipe(
	switchMap((response) => {
		if (response.ok) {
			return response.json();
		} else {
			return of({ error: true, message: `Error ${response.status}` });
		}
	}),
	map((data) => {
		if (data.states.length >= 20) {
			return data.states.slice(0, 20);
		} else {
			return data.states;
		}
	}),
	catchError((error) => {
		return of({ error: true, message: `Error ${response.status}` });
	})
);

const isRequestInCacheTest = await isRequestInCache(
	`${baseUrl}/states//all?extended=1`
);

const cachedOrRequestedFlightData$ = iif(
	() => isRequestInCacheTest,
	cachedFlightData$,
	requestedFlightData$
);

cachedOrRequestedFlightData$.subscribe((flightDataArray) =>
	flightData$.next(flightDataArray)
);

export { flightData$ };
