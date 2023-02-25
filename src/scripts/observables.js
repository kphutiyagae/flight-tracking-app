import { Subject, Observable, of } from "rxjs";
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
fromFetch(`${baseUrl}/states//all?extended=1`)
	.pipe(
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
	)
	.subscribe((flightsArray) => flightData$.next(flightsArray));
/*
//Derived from rxjs documentation: https://rxjs.dev/api/fetch/fromFetch
const flightData$ = fromFetch(`${baseUrl}/states//all?extended=1`).pipe(
	switchMap((response) => {
		if (response.ok) {
			addRequestToCache(`${baseUrl}/states//all?extended=1`);
			return response.json();
		} else {
			return of({ error: true, message: `Error ${response.status}` });
		}
	}),
	map((result) => {
		if (result.states.length >= 21) return result.states.slice(0, 20);
		else return result.states;
	}),
	catchError((err) => {
		console.error(err);
		return of({ error: true, message: err.message });
	})
);
*/
export { flightData$ };
