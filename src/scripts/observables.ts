import { Subject, iif, from, Observable, of } from "rxjs";
import { fromFetch } from "rxjs/fetch";
import { switchMap, map, catchError } from "rxjs/operators";
import {
    getCachedRequest,
    addRequestToCache,
    isRequestInCache,
} from "./web-storage";

import { baseUrl } from "./routes";

import { IFlight, IFlightAPIResponse, IFlightArray, ofError } from "../types/interfaces";

const flightData$: Subject<IFlight[] | ofError> = new Subject();

function isIFlightApiResponse(response: IFlightAPIResponse | { error: boolean, message: string }): response is IFlightAPIResponse {
    return response instanceof isIFlightApiResponse;
}


//Derived from rxjs documentation: https://rxjs.dev/api/fetch/fromFetch
const requestedFlightData$: Observable<IFlight[] | ofError> = fromFetch(
    `${baseUrl}/states//all?extended=1`
).pipe(
    switchMap((response) => {
        if (response.ok) {
            addRequestToCache(`${baseUrl}/states//all?extended=1`);
            return response.json() as Promise<IFlightAPIResponse>;
        } else {
            return of({ error: true, message: `Error ${response.status}` });
        }
    }),
    map((data) => {
        const flightA: IFlight[] = [];
        if (isIFlightApiResponse(data)) {
            if (data?.states?.flightsArray.length >= 20) {
                return data?.states.flightsArray.slice(0, 20);
            } else {
                return data?.states.flightsArray;
            }
        } return flightA;

    }),
    catchError((error) => {
        return of({ error: true, message: `Error ${error.status}` });
    })
);

const cachedFlightData$: Observable<IFlight[] | ofError> = from(
    getCachedRequest(`${baseUrl}/states//all?extended=1`)
).pipe(
    switchMap((response: Response) => {
        if (response.ok) {
            return response.json() as Promise<IFlightAPIResponse>;
        } else {
            return of({ error: true, message: `Error ${response.status}` });
        }
    }),
    map((data) => {
        const flightA: IFlight[] = [];
        if (isIFlightApiResponse(data)) {
            if (data?.states?.flightsArray.length >= 20) {
                return data?.states.flightsArray.slice(0, 20);
            } else {
                return data?.states.flightsArray;
            }
        } return flightA;
    }),
    catchError((error) => {
        return of({ error: true, message: `Error ${error.status}` });
    })
);

const isRequestInCacheTest: boolean = await isRequestInCache(
    `${baseUrl}/states//all?extended=1`
)

const cachedOrRequestedFlightData$ = iif(
    () => isRequestInCacheTest,
    cachedFlightData$,
    requestedFlightData$
);

cachedOrRequestedFlightData$.subscribe((flightDataArray) =>
    flightData$.next(flightDataArray)
);

export { flightData$ };