import { Subject, iif, from, Observable, of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, map, catchError } from "rxjs/operators";
import {
    getCachedRequest,
    addRequestToCache,
    isRequestInCache,
} from "./web-storage";

import { baseUrl } from "./routes";

import { IFlight, IFlightArray } from "../types/interfaces";

const flightData$: Subject<IFlightArray> = new Subject();

//Derived from rxjs documentation: https://rxjs.dev/api/fetch/fromFetch
const requestedFlightData$: Observable<Response> = fromFetch(
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
    map((data: IFlightArray):  => {
        if (data.states.length >= 20) {
            return data.states.slice(0, 20);
        } else {
            return data.states;
        }
    }),
    catchError((error) => {
        return of({ error: true, message: `Error ${error.status}` });
    })
);
