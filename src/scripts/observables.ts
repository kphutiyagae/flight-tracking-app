import { Subject, iif, from, Observable, of } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { switchMap, map, catchError } from 'rxjs/operators';
import {
    getCachedRequest,
    addRequestToCache,
    isRequestInCache,
} from './web-storage';

import { baseUrl } from './routes';

import { IFlight, IFlightAPIResponse, IofError } from '../types/interfaces';

const flightData$: Subject<IFlight[] | IofError> = new Subject();

function isIFlightApiResponse(response: IFlightAPIResponse | { error: boolean, message: string }): response is IFlightAPIResponse {
    return Object.keys(response).includes('states');
}

//Derived from rxjs documentation: https://rxjs.dev/api/fetch/fromFetch
const requestedFlightData$: Observable<IFlight[] | IofError> = fromFetch(
    `${baseUrl}/states/all?extended=1`
).pipe(
    switchMap((response) => {
        if (response.ok) {
            addRequestToCache(`${baseUrl}/states/all?extended=1`);
            return response.json() as Promise<IFlightAPIResponse>;
        } else {
            return of({ error: true, message: `Error ${response.status}` });
        }
    }),
    map((data) => {
        const flightArray: IFlight[] = [];
        if (isIFlightApiResponse(data)) {
            data?.states.map((stateVector) => {
                const flightData: IFlight = {
                    icao24: stateVector[0] as string ?? "",
                    callsign: stateVector[1] as string ?? "",
                    origin_country: stateVector[2] as string ?? "",
                    time_position: (stateVector[3] !== "null") ? parseFloat(stateVector[3]) : 0,
                    last_contact: (stateVector[4] !== "null") ? parseFloat(stateVector[4]) : 0,
                    longitude: (stateVector[5] !== "null") ? parseFloat(stateVector[5]) : 0,
                    latitude: (stateVector[6] !== "null") ? parseFloat(stateVector[6]) : 0,
                    baro_altitude: (stateVector[7] !== "null") ? parseFloat(stateVector[7]) : 0,
                    on_ground: (stateVector[8] === "true") ? true : false,
                    velocity: (stateVector[9] !== "null") ? parseFloat(stateVector[9]) : 0,
                    true_track: (stateVector[10] !== "null") ? parseFloat(stateVector[10]) : 0,
                    vertical_rate: (stateVector[11] !== "null") ? parseFloat(stateVector[11]) : 0,
                    sensors: (stateVector[12] !== "null") ? stateVector[12].split(",").map(parseFloat) : null,
                    geo_altitude: (stateVector[13] !== "null") ? parseFloat(stateVector[13]) : 0,
                    squak: stateVector[14] as string ?? "",
                    spi: (stateVector[15] === "true") ? true : false,
                    position_source: (stateVector[16] !== "null") ? parseFloat(stateVector[16]) : 0,
                    category: (stateVector[17] !== "null") ? parseFloat(stateVector[17]) : 0
                }
                if (flightData.callsign && (flightData.latitude && flightData.longitude))
                    flightArray.push(flightData);
            });
            return flightArray.slice(0, 20);
        }
        return flightArray;

    }),
    map(flightsArray => {
        return flightsArray
    }),
    catchError((e: IofError) => {
        const error: IofError = { error: true, message: `Error ${e.message}` };
        return of(error);
    })
);

const cachedFlightData$: Observable<IFlight[] | IofError> = from(
    getCachedRequest(`${baseUrl}/states/all?extended=1`)
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
            data?.states.map((stateVector) => {
                const flightData: IFlight = {
                    icao24: stateVector[0] as string ?? "",
                    callsign: stateVector[1] as string ?? "",
                    origin_country: stateVector[2] as string ?? "",
                    time_position: (stateVector[3] !== "null") ? parseFloat(stateVector[3]) : 0,
                    last_contact: (stateVector[4] !== "null") ? parseFloat(stateVector[4]) : 0,
                    longitude: (stateVector[5] !== "null") ? parseFloat(stateVector[5]) : 0,
                    latitude: (stateVector[6] !== "null") ? parseFloat(stateVector[6]) : 0,
                    baro_altitude: (stateVector[7] !== "null") ? parseFloat(stateVector[7]) : 0,
                    on_ground: (stateVector[8] === "true") ? true : false,
                    velocity: (stateVector[9] !== "null") ? parseFloat(stateVector[9]) : 0,
                    true_track: (stateVector[10] !== "null") ? parseFloat(stateVector[10]) : 0,
                    vertical_rate: (stateVector[11] !== "null") ? parseFloat(stateVector[11]) : 0,
                    sensors: (stateVector[12] !== null) ? stateVector[12].split(",").map(parseFloat) : null,
                    geo_altitude: (stateVector[13] !== "null") ? parseFloat(stateVector[13]) : 0,
                    squak: stateVector[14] as string ?? "",
                    spi: (stateVector[15] === "true") ? true : false,
                    position_source: (stateVector[16] !== "null") ? parseFloat(stateVector[16]) : 0,
                    category: (stateVector[17] !== "null") ? parseFloat(stateVector[17]) : 0
                }
                if (flightData.callsign && (flightData.latitude && flightData.longitude))
                    flightA.push(flightData);
            });
            return flightA.slice(0, 20);
        } return flightA;
    }),
    map((flightsArray: IFlight[]) => {
        return flightsArray;

    }),
    catchError((e: IofError) => {
        const error: IofError = { error: true, message: `Error ${e.message}` };
        return of(error);
    })
);

const isRequestInCacheTest: boolean = await isRequestInCache(
    `${baseUrl}/states/all?extended=1`
)

const cachedOrRequestedFlightData$: Observable<IFlight[] | IofError> = iif(
    () => isRequestInCacheTest,
    cachedFlightData$,
    requestedFlightData$
);

cachedOrRequestedFlightData$.subscribe((flightDataArray) =>
    flightData$.next(flightDataArray)
);

export { flightData$, isIFlightApiResponse };